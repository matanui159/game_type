import * as util from './util';

let canvas = document.getElementsByTagName('canvas')[0];
let gl = util.create(canvas.getContext('webgl'), 'context');
export default gl;