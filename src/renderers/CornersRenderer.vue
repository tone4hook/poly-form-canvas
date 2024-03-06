<template>
  <div>
    <div class="row pb-2 mb-2 border-bottom">
      <div class="col-12">
        <h3>{{ label }}</h3>
      </div>
    </div>
    <div
      class="row pb-3 mb-3 border-bottom"
      v-for="(value, index) in values"
      :key="index"
    >
      <div class="col-12">
        <h5>{{ labels[index] }}</h5>
      </div>
      <div class="col-6">
        <label :for="'conrer-x-' + index" class="form-label">X value</label>
        <input
          type="number"
          class="form-control"
          :id="'conrer-x-' + index"
          :placeholder="'enter x value ' + (index + 1)"
          v-model="value.x"
        />
      </div>
      <div class="col-6">
        <label :for="'conrer-y-' + index" class="form-label">Y value</label>
        <input
          type="number"
          class="form-control"
          :id="'conrer-y-' + index"
          :placeholder="'enter y value ' + (index + 1)"
          v-model="value.y"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { ControlElement } from "@jsonforms/core";
import {
  RendererProps,
  rendererProps,
  useJsonFormsArrayControl,
} from "@jsonforms/vue";

const cornersControlRenderer = defineComponent({
  name: "CornersRenderer",
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    const { control } = useJsonFormsArrayControl(props);

    const labels = computed(() => {
      return control.value.data.map(
        (_corner: { x: number; y: number }, index: number) =>
          `Corner ${index + 1} `
      );
    });

    return {
      label: control.value.label,
      labels,
      values: control.value.data as { x: number; y: number }[],
    };
  },
});

export default cornersControlRenderer;
</script>
