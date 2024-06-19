<template>
<div id="useStarImageCircle">
    <StarImageCircle :imageSrc="imageSrc" :size="150" />
    <StarImageCircle :imageSrc="imageSrc" :size="125" />
    <StarImageCircle :imageSrc="imageSrc" :size="100" />

</div>
</template>
<script>
import StarImageCircle from '@/components/StarImageCircle.vue';
export default {
    name: 'UseStarImageCircle',
    components: {
        StarImageCircle
    },
    data() {
        return {
            imageSrc: require('../assets/pinkDragonPixel1.png')
        };
    }
};
</script>

<style scoped>
#useStarImageCircle {
    width: 100%;
    height: 100%;
}
</style>