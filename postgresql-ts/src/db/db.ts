import * as path from 'path'
import { Sequelize } from 'sequelize-typescript'
import Animal from './models/animal';
import Config from '../conf/db.conf';

const {host,database,dialect,username,password} = Config;

const sequelize =  new Sequelize({
  host: host,
  database: database,
  dialect: dialect,
  username: username,
  password: password,
  modelPaths: [path.resolve(__dirname, `./models`)]
});


/**
 * @name: 查询
 * @test: test font
 * @msg:  
 * @param : undefined
 * @return : undefined
 */
export async function findAll(){
  const results = await Animal.findAll({
    raw: true
  })
  console.log('results: ', results);
  return results;
}

/**
 * @name: 新增
 * @test: test font
 * @msg:  
 * @param : undefined
 * @return : undefined
 */
export async function create(){
  const name = 'Niko';
  const weight = 70;
  const results = await Animal.create({
    name,
    weight
  })
  return results;
}