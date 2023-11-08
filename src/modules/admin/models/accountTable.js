import dynamicTable from '../../../../util/dynamicTable.js'
const sql = `
    CREATE TABLE IF NOT EXISTS account (
      id INT(11) AUTO_INCREMENT PRIMARY KEY  NOT NULL,
      acc_type VARCHAR(1000) NOT NULL,
      acc_num VARCHAR(1000) NOT NULL,
      ccy VARCHAR(1000) NOT NULL,
      status VARCHAR(1000) NOT NULL DEFAULT 'active',
      username VARCHAR(1000) NOT NULL,
      balance VARCHAR(8000) NOT NULL DEFAULT '0',
      sym VARCHAR(90) NOT NULL,
      defaultAcc VARCHAR(100) NOT NULL DEFAULT 'yes', memberId INT(11) NOT NULL
    ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
  `;

// const accountTable = ()=>{
//   db.query(sql, ( err, result)=> {
//     if(err)console.log(err);
//   })

// }
const accountTable = dynamicTable(sql)
export default accountTable