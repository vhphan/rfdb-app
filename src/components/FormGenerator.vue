<template>
<div class="q-dialog-plugin">
   <vue-form-json-schema
    v-model="value"
    :schema="schema"
    :ui-schema="uiSchema"
    v-on:state-change="onChangeState"
    v-on:validated="onValidated"
    :components="components"
  />
</div>

</template>

<script>
import { QInput, QCard, QExpansionItem } from 'quasar'
import VueFormJsonSchema from 'vue-form-json-schema';
export default {
  name: 'FormGenerator',
  props: ['value', 'schema', 'uiSchema'],
  components: {
    VueFormJsonSchema
  },
  data () {
    return {
      components: { // Add your sandboxed quasar or other components here (if you don't add it here, you can't use them)
        'input': QInput,
        'card': QCard,
        'expansion': QExpansionItem
      }
    }
  },
  methods: {
    onChange (value) {
      this.$emit('change', value)
    },
    onChangeState (value) {
      this.$emit('state', value)
    },
    onValidated (value) {
      this.$emit('valid', value)
    }
  }
}
</script>