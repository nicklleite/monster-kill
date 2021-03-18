<template>
    <button :class="[`btn-${btnVariant}`, `btn-${btnSize}`, 'btn']">{{ btnActionText }}</button>
</template>

<script>
export default {
    name: 'ActionButton',

    props: {
        btnVariant: String,
        btnActionText: String,
        btnSize: String
    }
}
</script>

<style lang="scss" scoped>

</style>