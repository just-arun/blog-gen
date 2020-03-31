<template src="./create-post.html"></template>

<script>
import MarkdownIt from 'markdown-it';
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    title: String,
    description: String,
    keywords: Array,
    body: String
  },
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "createPost" }),
      tags: [
        "VueJS",
        "Angular",
        "AngularJs",
        "ReactJs",
        "MongoDb",
        "GO",
        "Golang",
        "JavaScript",
        "JS",
        "SQL",
        "PHP",
        "OOP"
      ],
      shotEdit: true,
      previewData: '',
      previewTitle: ''
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.$emit('submit', values);
        }
      });
    },
    async preview() {
      let md = new MarkdownIt()
      let data = await this.form.getFieldsValue()
      this.previewData = md.render(data.body || "");
      this.previewTitle = data.title;
      this.shotEdit = !this.shotEdit;
    },
    initFun() {
      if (this.type !== "create") {
        this.form = this.$form.createForm(this, {
          onFieldsChange: (_, changedFields) => {
            this.$emit("change", changedFields);
          },
          mapPropsToFields: () => {
            return {
              title: this.$form.createFormField({
                value: this.title || ""
              }),
              description: this.$form.createFormField({
                value: this.description || ""
              }),
              keywords: this.$form.createFormField({
                value: this.keywords || ""
              }),
              body: this.$form.createFormField({
                value: this.body || ""
              })
            };
          },
          onValuesChange: (_, values) => {
            console.log(values);
          }
        });
      }
    }
  },
  created() {
    this.initFun();
  }
};
</script>
<style scoped lang="scss">
  @import "./create-post.scss";
</style>