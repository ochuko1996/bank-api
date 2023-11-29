import db from './db.js'
 
const dynamicTable = async (sql)=>{
    try {
        await db.query(sql)
        // console.log(result);
    } catch (error) {
        console.log(error);        
    }   
}

export default dynamicTable