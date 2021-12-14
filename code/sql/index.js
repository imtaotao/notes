const init = require('./utils.js');

init(async (exec, connection) => {
  // 创建表
  // const result = await exec(`
  //   create table apps2 (
  //     appId int primary key auto_increment comment "appid",
  //     appName varchar(255) not null comment "应用名称",
  //     principal varchar(255) not null comment "负责人",
  //     manager json comment "管理员",
  //     developers json comment "开发人员",
  //     createTime timestamp not null default current_timestamp comment "创建日期",
  //     alterTime timestamp not null default current_timestamp on update current_timestamp comment "修改日期"
  //   );
  // `);

  const result = await exec(`
    insert into apps (
      appName,
      principal,
      manager,
      developers
    )
    values (
      testApp,
      chentao.arthur,
      "${JSON.stringify(['chentao', 'chentao2',])}",
      "${JSON.stringify(['chentao1', 'chentao2'])}"
    );
  `)
  console.log(result);
})