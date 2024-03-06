<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <span class="navbar-brand mb-0 h1">Poly Form Canvas</span>
    </div>
  </nav>
  <div class="container mt-3">
    <div class="row">
      <div
        class="col-xl-6 col-12 d-flex align-items-center justify-content-center"
      >
        <json-forms
          :data="{ corners }"
          :renderers="Object.freeze(renderers)"
          :schema="jsonSchema"
          :uischema="uiSchema"
          @change="onChange"
        />
      </div>
      <div
        class="col-xl-6 col-12 d-flex align-items-center justify-content-center"
      >
        <canvas
          class="border border-gray-700"
          ref="canvas"
          width="500"
          height="500"
          @mousedown="startMoving"
          @mouseup="stopMoving"
          @mousemove="move"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { JsonForms, JsonFormsChangeEvent } from "@jsonforms/vue";
import { vanillaRenderers } from "@jsonforms/vue-vanilla";
import entries from "./entries";

/** add custom renderers to vanilla set */
const renderers = [...entries, ...vanillaRenderers];

/** JSON Schema */
const jsonSchema = ref({
  properties: {
    corners: {
      type: "array",
      minItems: 4,
      maxItems: 4,
      items: {
        type: "object",
        properties: {
          x: { type: "number" },
          y: { type: "number" },
        },
        required: ["x", "y"],
      },
    },
  },
});
/** UI Schema */
const uiSchema = ref({
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/corners",
      options: {
        showSortButtons: false,
      },
    },
  ],
});

const canvas = ref<HTMLCanvasElement | null>(null);
const context = ref<CanvasRenderingContext2D | null>(null);

/** corners - form data bind */
const corners = ref<Array<{ x: number; y: number }>>([
  { x: 100, y: 100 },
  { x: 200, y: 100 },
  { x: 200, y: 200 },
  { x: 100, y: 200 },
]);

// Handle changes to the form
const onChange = (event: JsonFormsChangeEvent) => {
  // Update the corners
  corners.value = event.data.corners;
};

// Index of the corner that is currently being moved, or null if no corner is being moved
let movingCornerIndex = ref<number | null>(null);

// Start moving a corner
const startMoving = (event: MouseEvent) => {
  // Get the position of the canvas
  const rect = canvas.value?.getBoundingClientRect();
  // Calculate the position of the mouse relative to the canvas
  const x = event.clientX - (rect?.left || 0);
  const y = event.clientY - (rect?.top || 0);
  // Find the corner that is close to the mouse position
  movingCornerIndex.value = corners.value.findIndex(
    (corner) => Math.abs(corner.x - x) < 10 && Math.abs(corner.y - y) < 10
  );
};

// Stop moving a corner
const stopMoving = () => {
  movingCornerIndex.value = null;
};

// Move a corner
const move = (event: MouseEvent) => {
  // If no corner is being moved, do nothing
  if (movingCornerIndex.value === null) return;
  // Get the position of the canvas
  const rect = canvas.value?.getBoundingClientRect();
  // Calculate the new position of the corner, making sure it stays within the canvas
  const x = Math.max(
    0,
    Math.min(event.clientX - (rect?.left || 0), canvas.value?.width || 0)
  );
  const y = Math.max(
    0,
    Math.min(event.clientY - (rect?.top || 0), canvas.value?.height || 0)
  );
  // Update the position of the corner
  corners.value[movingCornerIndex.value] = { x, y };
};

// Draw the rectangle
function drawRectangle() {
  // If the canvas or its context is not available, do nothing
  if (!context.value || !canvas.value) return;
  // Clear the canvas
  context.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  // Start a new path
  context.value.beginPath();
  // Move to the first corner
  context.value.moveTo(corners.value[0].x, corners.value[0].y);
  // Draw lines to the other corners
  for (let i = 1; i < corners.value.length; i++) {
    context.value.lineTo(corners.value[i].x, corners.value[i].y);
  }
  // Close the path
  context.value.closePath();
  // Stroke the path
  context.value.stroke();
}

// When the component is mounted
onMounted(() => {
  // Get the context of the canvas
  if (canvas.value) {
    context.value = canvas.value.getContext("2d");
  }
  // Draw the initial rectangle
  drawRectangle();
});

// Watch for changes to the corners
watch(
  corners,
  () => {
    // Redraw the rectangle when the corners change
    drawRectangle();
  },
  { deep: true }
);
</script>
