import { InternalServerErrorException } from '@nestjs/common';
import * as redis from 'redis';
import { serverConfig } from '../config/server.config';
import * as util from 'util';

class RedisInstance{
    static instance:redis.RedisClient
    private constructor(){
        console.info("Redis client created!")
    }
    static getInstance(){
        if(!this.instance){
            const {host,port,prefix} = serverConfig.redis;
            try{
                let newInstance = redis.createClient({host,port,prefix});
                this.instance = newInstance;
            } catch(err){
                console.log("Redis connection error! Detail:",err);
                throw new InternalServerErrorException();
            }
        }
        return this.instance;
    }

}

interface IRedisHelper {
    expire_time?:number;
}
export class RedisHelper {
    instance:redis.RedisClient;
    expire_time:number;
    constructor(expire_time=serverConfig.expire_time){
        this.expire_time = expire_time;
        this.instance = RedisInstance.getInstance();
    }
    async getItem(key:string|number):Promise<string|null>{
        console.log("[ACTION][REDIS][GET] Key:",key);
        const getAsync = util.promisify(this.instance.get).bind(this.instance);
        try{
            let result = await getAsync(String(key));
            return result;
        } catch(err){
            console.log("Not found item in redis, error:",err);
            return null;
        }
    }
    async setItem(key:string|number,value:string){
        console.log("[ACTION][REDIS][SET] Key:",key," Value:",value);
        const setAsync = util.promisify(this.instance.setex).bind(this.instance);
        try{
            let result = await setAsync(`${key}`,this.expire_time,value);
            console.log("Set status:",result);
            return true;
        } catch(err){
            console.log("Redis set error, error:",err);
            return false;
        }
    }
}