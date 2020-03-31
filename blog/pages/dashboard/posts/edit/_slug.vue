<template>
    <div>
        {{this.$route.params.slug}} <br />
        <CreatePost
        type="edit"
        title="dsfasfd"
        description="adsfadsfadsf"
        :keywords="key"
        body="safdsafdsf"
        @submit="submitHandle()"
        />
    </div>
</template>
<script>
import CreatePost from "@/components/posts/create-post/create-post";
export default {
    layout: 'dashboard',
    components: {
        CreatePost
    },
    data() {
        return {
            key: ['asdfadsf','adsfadsfadsf']
        }
    },
    methods: {
        submitHandle() {
            
        }
    },
}
</script>