<template>
  <div
    class="update"
    @click="upload"
    @drop.stop.prevent="drop"
    @paste.stop.prevent="paste"
    @dragover.stop.prevent=""
    @dragenter.stop.prevent="dragenter"
    @dragleave.stop.prevent="dragleave"
    draggable
  >
    <div v-if="isOver">
      <slot name="over" v-if="$slots.over"> </slot>
      <p v-else> {{overText}} </p>
    </div>
    <div v-else>
      <slot name="content" v-if="$slots.content"> </slot>
      <p v-else> {{ text }} </p>
    </div>
    <input :accept="acceptMimes.join(',')" :multiple="multiple" style="display:none" @change="onChange" type="file" id="fileUpload">
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { forEachFile } from '@/helpers/file.js'

export default {
  props: {
    text: {
      type: String,
      default: 'Clique ou arraste o arquivo aqui para fazer o upload',
    },
    overText: {
      type: String,
      default: 'Solte aqui o arquivo',
    },
    selector: {
      type: String,
      default: '#fileUpload',
    },
    acceptMimes: {
      type: [Array],
      default: [],
    },
    value: {
      default: [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { selector, acceptMimes, multiple } = props
    const upload = () => {
      document.querySelector(selector).click()
    }

    const onChange = event => {
      const { files: inputFiles } = event.target
      handleFiles(inputFiles)
    }

    const paste = e => {
      const { files: pasteFiles } = e.clipboardData
      handleFiles(pasteFiles)
    }

    const drop = e => {
      const { items: dropFiles } = e.dataTransfer
      const fileUrl = e.dataTransfer.getData('text')
      if (fileUrl) return

      handleFiles(dropFiles)
    }

    const dragenter = () => {
      isOver.value = true
    }

    const dragleave = () => {
      isOver.value = false
    }

    const handleFiles = filesParam => {
      const files = []
      forEachFile(filesParam, file => {
        files.push(file)
      })

      if (files.length) emit('input', multiple ? files : files[0])
    }

    const isOver = ref(false)

    return {
      upload,
      onChange,
      drop,
      paste,
      dragenter,
      dragleave,
      isOver,
    }
  },
}
</script>

<style scoped>
.update {
  border: 1px dashed black;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
