import PostModel, { Post } from "../models/post";
import { ObjectID } from "bson";

export default class PostService {
  async createPost(post: Post) {
    try {
      post.slug = post.title.toLowerCase().replace(/ /g, "-");
      return new PostModel(post)
        .save()
        .then(res => res)
        .catch(err => Promise.reject(err));
    } catch (err) {
      Promise.reject(err);
    }
  }
  async updatePost(_id: ObjectID, post: Post) {
    try {
      delete post.author;
      return PostModel.findOneAndUpdate(
        { _id },
        {
          $set: post
        }
      )
        .then(res => res)
        .catch(err => Promise.reject(err));
    } catch (err) {
      Promise.reject(err);
    }
  }
  async getAll(page: number) {
    let limit = page * 20;
    let skip = (page - 1) * 20;
    return PostModel.find(
      {},
      {
        title: 1,
        slug: 1,
        createdAt: 1,
        updatedAt: 1,
        description: 1,
        keywords: 1
      }
    )
      .skip(skip)
      .limit(limit);
  }

  async getOneRendered(slug: string) {
    return PostModel.findOne({ slug })
      .then(res => res)
      .catch(err => Promise.reject(err));
  }
}
