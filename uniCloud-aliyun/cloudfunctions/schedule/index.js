let db = uniCloud.database({
  throwOnNotFound: false,
})
exports.main = async (event, context) => {
  //event为客户端上传的参数
  console.log('event : ', event)
  if (event.api === 'publish') {
    return await db.collection('schedule').add({
      uid: event.uid,
      title: event.title,
      datetimerange: event.datetimerange,
      level: event.level,
      text: event.text,
      status: event.status,
      jointime: event.jointime
    })
  }
  if (event.api === 'getMessage') {
    return await db.collection('schedule').where({
      uid: event.uid
    }).get()
  }
  if (event.api === 'delMessage') {
    return await db.collection('schedule').where({
      _id: event.id
    }).remove()
  }
  if (event.api === 'update') {
    return await db.collection('schedule').where({
      _id: event.sid
    }).update({
      title: event.title,
      datetimerange: event.datetimerange,
      level: event.level,
      text: event.text,
      status: event.status
    })
  }
  if (event.api === 'done') {
    return await db.collection('schedule').where({
      _id: event.id
    }).update({
      status: event.status
    })
  }
  //返回数据给客户端
  return event
};
