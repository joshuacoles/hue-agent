import { readdirSync } from 'fs'
import { join } from 'path'

readdirSync('../tasks').filter(file => file.matches(/.*\.js/)).map(file => require(join('../tasks', file)));
