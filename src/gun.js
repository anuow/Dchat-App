import Gun from "gun";
import 'gun/sea';
import 'gun/axe';


const peers = [
    'https://gun-manhattan.herokuapp.com/gun',
    'https://gun-us.herokuapp.com/gun'
];

export const gun = Gun({ peers });
export default gun;