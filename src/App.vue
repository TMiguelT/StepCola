<template>
    <div id="app">
        <Cola v-bind:nodes="graph.nodes" v-bind:links="graph.links"/>
        <sui-input v-on:change="fileUpdate" accept=".json" type="file" placeholder="Search..."/>
    </div>
</template>

<script>
    import Cola from './components/Cola.vue'
    import stepToD3 from './StepToD3'


    export default {
        name: 'app',
        data() {
            return {
                stepJson: null
            }
        },
        methods: {
            fileUpdate(e) {
                const reader = new FileReader()
                reader.onload = e => {
                    const text = e.target.result
                    this.stepJson = JSON.parse(text)
                }
                reader.readAsText(e.target.files[0])
            }
        },
        computed: {
            graph() {
                if (this.stepJson)
                    return stepToD3(this.stepJson)
                else
                    return {
                        nodes: [],
                        links: []
                    }
            }
        },
        components: {
            Cola
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
</style>
