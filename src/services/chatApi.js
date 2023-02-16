/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';

export const imamListApi = async data => {
  console.log('imamListDAta', data);

  try {
    const result = await fetch(
      `http://app.altawheedjc.org/api/imam?reciever_id=${data.reciever_id}`,
      {
        method: 'post',
        headers: {
          Accept: 'application/json',
        },
      },
    );

    const resJson = await result.json();
    console.log('imamListApi', resJson);
    return resJson;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const userListApi = async data => {
  try {
    const result = await fetch(
      `http://app.altawheedjc.org/api/allUser?reciever_id=${data.reciever_id}`,
      {
        method: 'post',
        headers: {
          Accept: 'application/json',
        },
      },
    );

    const resJson = await result.json();
    // console.log("getData",resJson)
    return resJson;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getChatApi = async data => {
  try {
    const result = await fetch(
      `http://app.altawheedjc.org/api/get-chat-list?sender_id=${data.senderId}&reciever_id=${data.recieverId}`,
      {
        method: 'post',
        headers: {
          Accept: 'application/json',
        },
      },
    );

    const resJson = await result.json();
    console.log('getChatApi', resJson);
    return resJson;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getImamChatApi = async data => {
  console.log('char', data);

  try {
    const result = await fetch(
      `http://app.altawheedjc.org/api/get-chat-list?sender_id=${data.senderId}&reciever_id=${data.recieverId}`,
      {
        method: 'post',
        headers: {
          Accept: 'application/json',
        },
      },
    );

    const resJson = await result.json();
    console.log('getImamChatApi', resJson);
    return resJson;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const postChatApi = async data => {
  console.log('data2', data);
  try {
    const result = await fetch(
      `http://app.altawheedjc.org/api/send-message?sender_id=${data.sender_id}&reciever_id=${data.reciever_id}&text=${data.text}&time=${data.time}`,
      {
        method: 'post',
        headers: { 'content-type': 'multipart/form-data' },
      },
    );

    // console.log("response",result)
    const resJson = await result.json();
    console.log('postChatApi', resJson);
    return resJson;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const messgageSendByImam = async data => {
  console.log(data);
  try {
    const result = await fetch(
      `http://app.altawheedjc.org/api/send-message?sender_id=${data.sender_id}&reciever_id=${data.reciever_id}&text=${data.text}`,
      {
        method: 'post',
        headers: { 'content-type': 'multipart/form-data' },
      },
    );

    console.log('response', result);
    const resJson = await result.json();
    console.log('messgageSendByImam', resJson);
    return resJson;
  } catch (err) {
    console.log(err);
    return err;
  }
};
