import test from 'node:test'
import assert from 'node:assert/strict'
import { buildLingxiTools } from '../lib/tools.js'
import { loggingBridge } from '../lib/notify-log.js'
import { PetBridge } from '../lib/pet-contract/bridge.js'

function tools(bridge) {
 return buildLingxiTools({bridge,settings:{agentId:'dsh',tools:{state:true,react:true}},notifier:{handle(){}}})
}
test('state includes live capabilities used to choose valid actions and the automatic-effects policy',async()=>{
 const bridge={perception:async()=>({ok:true,data:{petState:'idle'}}),capabilities:async()=>({ok:true,data:{autoEffects:{enabled:false}}})}
 const result=await tools(bridge).find(t=>t.name==='lingxi_state').execute({})
 assert.equal(result.data.capabilities.autoEffects.enabled,false)
})
test('automatic performances skip disabled, unknown and cooling policies without sending control',async()=>{
 for(const policy of [undefined,{enabled:false,remainingCooldownMs:0},{enabled:true,remainingCooldownMs:200}]) {
  const calls=[];const bridge={capabilities:async()=>({ok:true,data:{autoEffects:policy}}),control:async c=>{calls.push(c);return {ok:true}}}
  const result=await tools(bridge).find(t=>t.name==='lingxi_react').execute({perform:'zoomies'})
  assert.equal(result.skipped,true);assert.equal(calls.length,0)
 }
})
test('automatic and explicit manual performances carry the native policy marker',async()=>{
 const calls=[];const bridge={capabilities:async()=>({ok:true,data:{autoEffects:{enabled:true,remainingCooldownMs:0}}}),control:async c=>{calls.push(c);return {ok:true}}}
 const tool=tools(bridge).find(t=>t.name==='lingxi_react')
 await tool.execute({perform:'zoomies'});await tool.execute({perform:'zoomies',automatic:false})
 assert.equal(calls[0].performAutomatic,true);assert.equal(calls[0].priority,'flavour')
 assert.equal(calls[1].performAutomatic,false);assert.equal('automatic' in calls[1],false)
})
test('logging follows a replaced bridge after identity or port settings change',async()=>{
 const calls=[];const ref={current:{control:async()=>{calls.push('old');return {ok:true}}}}
 const proxy=loggingBridge(ref,{record(){}})
 ref.current={control:async()=>{calls.push('new');return {ok:true}},capabilities:async()=>({ok:true,data:{new:true}})}
 await proxy.control({say:'hello'});assert.deepEqual(calls,['new'])
 assert.equal((await proxy.capabilities()).data.new,true)
})
test('an unreachable app reports a concrete installation guide without downloading or installing',async()=>{
 const bridge=new PetBridge({token:'test',fetchImpl:async()=>{throw new Error('offline')}})
 const result=await bridge.perception();assert.equal(result.unreachable,true)
 assert.match(result.installationHint,/https:\/\/github.com\/dushaobindoudou\/lingxi\/releases\/latest/)
})

test('fresh bounded asks survive watch-to-notifier delivery instead of an earlier model summary',async()=>{
 const {TaskWatch}=await import('../lib/tasks.js')
 const {AttentionNotifier}=await import('../lib/notify.js')
 const says=[];const events=[]
 const notifier=new AttentionNotifier({bridge:{taskEvent:async e=>{events.push(e);return {ok:true}},control:async c=>{says.push(c);return {ok:true}}},getSettings:()=>({agentId:'dsh',notify:{}}),delay:()=>()=>{}})
 notifier.handle({taskId:'session',state:'running',source:'tool',summary:'先前正在处理的任务说明'})
 const watch=new TaskWatch({ctx:{get:()=>undefined},bridge:{},getSettings:()=>({}),onTransition:t=>notifier.handle(t)})
 const question='需要你确认：是否保留今天修改过的全部设置，并继续完成当前版本发布？'
 watch.track('session',{source:'question',state:'needs_input',title:question,composed:true})
 await Promise.resolve()
 assert.ok(says.some(c=>c.say.includes(question)))
 assert.equal(events.at(-1).summary,question)
})

test('the bundled installation and interaction skill registers and disposes in the host catalog',async()=>{
 const {registerLingxiSkill}=await import('../lib/skill.js')
 let skill,removed=false
 const dispose=registerLingxiSkill({register:value=>{skill=value;return ()=>{removed=true}}})
 assert.equal(skill.name,'lingxi-dsh');assert.equal(skill.source,'bundled')
 assert.ok(skill.path.endsWith('skills/lingxi-dsh/SKILL.md'))
 assert.ok(skill.content.includes('releases/latest'))
 dispose();assert.equal(removed,true)
 assert.equal(registerLingxiSkill(undefined),null)
})
