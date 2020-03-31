import { HttpRequest } from "../util/httpReuqest";
import MarkdownIt from 'markdown-it';
import * as moment from 'moment';

export const GetAllUserPosts = async () => {
  return await HttpRequest("GET", "/post-get?page=1")
    .then(res => res.data.data)
    .catch(err => {
      console.log(err);
    });
};


export const GetRenderedPost = async (link) => {
  return await HttpRequest("GET", `/post-get/${link}`)
  .then(res => {
    let md = new MarkdownIt()
    let data = res.data.data;
    data.createdAt = moment(data.createdAt).format("MMM DD, YYY")
    let html = md.render(data.body);
    let prepareHtml = html
    
    data.body = prepareHtml.replace("class=\"language-js\"", 'class=\"language-js javascript hljs\"javascript hljs').replace('href', ' target="_blank" href')
    return data;
  })
  .catch(err => {
    console.log(err);
  })
}