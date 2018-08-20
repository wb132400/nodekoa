const db = require('../databases/redis')
module.exports = {
    join: async function (ctx, next) {


        var ip = ctx.request.body.ip
        var activityName = ctx.request.body.activityName
     
        var key = activityName + 'join'
        var id = ip + activityName
        console.log('ip'+ip)
        var result = await db.get(id)
        var result1 = await db.get(key)
        if (result1) {
            if (result) {
                ctx.send('已统计')
            } else {
                await db.set(id, 1)
                await db.add1(key)
                var num = await db.get(key)
                ctx.body = num
            }
        } else {
            await db.set(key, 1)
            ctx.body = 1
        }

    },
    click: async function (ctx, next) {

        var ip = ctx.request.body.ip
        var activityName = ctx.request.body.activityName
        var key = activityName + 'click'
        var result = await db.get(key)
        console.log(result)
        if (result) {
            await db.add1(key)
            var num = await db.get(key)
            ctx.body = num
        } else {
            await db.set(key, 1)
            ctx.body = 1
        }



    },
    share: async function (ctx, next) {

        var ip = ctx.request.body.ip
        var activityName = ctx.request.body.activityName
        var key = activityName + 'share'
        var result = await db.get(key)
        console.log(result)
        if (result) {
            await db.add1(key)
            var num = await db.get(key)
            ctx.body = num
        } else {
            await db.set(key, 1)
            ctx.body = 1
        }

    },
    activityCount:async function (ctx, next) {

        // var result = await db.get(key)
        var list=ctx.request.body.activityList
        var result=[]
        var type=['join','click','share']
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            var obj={}
            for (let i = 0; i < type.length; i++) {
                const   type1 = type[i];
                var key=element+type1
                console.log(key)
                var num=await db.get(key)
                if (num) {
                    obj[key]=num
                } else {
                    obj[key]=0
                }
                
               

            }
            result.push(obj)
            
        }
        ctx.body=result
        

    }
}