<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <van-image-preview v-model="show" :images="images" @change="onChange"  @close="onClose">

        <template v-slot:index>
            <p class="productName">{{title}}</p>
            <p>第{{ index+1 }}张</p>
        </template>
    </van-image-preview>
</template>

<script>
    export default {
        props:['images','show','title'],
        data() {
            return {
                imgPath:localStorage.getItem('imgPath'),
                index: 0

            };
        },
        methods: {
            onChange(index) {
                this.index = index;
            },
            onClose(){
                this.$parent.onPreviewClose();
            },
        },
        mounted() {

        }
    }
</script>

