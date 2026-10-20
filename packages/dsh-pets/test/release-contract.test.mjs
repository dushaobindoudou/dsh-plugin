import test from 'node:test'
import assert from 'node:assert/strict'
import { PetBridge, cleanTaskEvent, DEFAULT_PET_SETTINGS } from '../lib/index.js'

test('bridge sends identity, fetches capabilities and removes host-only correlation metadata',async()=>{
 const calls=[]
 const bridge=new PetBridge({agentId:'dsh',token:'fixture',fetchImpl:async(url,options)=>{calls.push({url,options});return {ok:true,status:200,json:async()=>({autoEffects:{enabled:false}})}}})
 await bridge.capabilities();await bridge.control({say:'hello',taskId:'host-correlation'})
 assert.match(calls[0].url,/\/capabilities$/)
 assert.equal(calls[0].options.headers['X-Lingxi-Agent'],'dsh')
 assert.deepEqual(JSON.parse(calls[1].options.body),{say:'hello'})
})
test('task provenance survives shared contract normalization without enabling mount announcements',()=>{
 const event=cleanTaskEvent({state:'completed',label:'current task',origin:'hook'},'dsh')
 assert.equal(event.label,'current task');assert.equal(event.origin,'hook')
 assert.equal(DEFAULT_PET_SETTINGS.autoAnnounce,false)
})
test('bridge surfaces native permission refusal reasons',async()=>{
 const bridge=new PetBridge({token:'fixture',fetchImpl:async()=>({ok:false,status:403,json:async()=>({rejected:['permission denied']})})})
 assert.equal((await bridge.memory({text:'hello'})).error,'permission denied')
})
