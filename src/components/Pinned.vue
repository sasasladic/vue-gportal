<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    import {throttle} from 'lodash';

    export default {
        name: "Pinned",
        mounted() {
            let bar = this.$el;
            let originalOffsetTop = this.$el.offsetTop;

            window.addEventListener(
                'scroll',
                throttle(function(){
                    if(window.scrollY >= originalOffsetTop){
                        bar.classList.add('navbar-fixed-top', 'container', 'test');
                    } else {
                        bar.classList.remove('navbar-fixed-top', 'container', 'test');
                    }
                }, 200)
            );
        }

    }
</script>

<style scoped>
    .is-fixed-to-top {
      position: fixed;
      top: 0;
      z-index: 10;
      opacity: 10;
      padding-left: 0;
      padding-right: 0;
      margin-right: 0;
      margin-left: 0;
    }
</style>
