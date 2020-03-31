import { model, Schema } from "mongoose";
import {
  ObjectID
} from 'bson'

const PostModel = model(
  "Posts",
  new Schema(
    {
      title: {
        type: String,
        required: true
      },
      slug: {
        type: String,
        required: true
      },
      keywords: [
        {
          type: String,
          required: true
        }
      ],
      description: {
        type: String,
        required: true
      },
      body: {
        type: String,
        required: true
      },
      author: {
          type: ObjectID,
          ref: 'User',
          required: true
      },
      likes: {
        type: Number,
        default: 0
      }
    },
    { timestamps: true }
  )
);

export class Post {
  public title!: string;
  public slug?: string;
  public keyword!: string[];
  public description!: string;
  public body!: string;
  public author!: string;
}

export default PostModel;
