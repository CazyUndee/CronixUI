<template>
  <div class="cn-table-wrapper">
    <table class="cn-table">
      <thead>
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="index"
            :class="{ sortable }"
            @click="handleSort(index)"
          >
            {{ header }}
            <span v-if="sortable" class="sort-indicator" :class="{ active: sortColumn === index }">
              {{ sortColumn === index ? (sortDirection === 'asc' ? '↑' : '↓') : '↑' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in sortedRows" :key="i">
          <td v-for="(cell, j) in row" :key="j">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  headers: { type: Array, default: () => [] },
  rows: { type: Array, default: () => [] },
  sortable: { type: Boolean, default: false },
});

const emit = defineEmits(['sort']);

const sortColumn = ref(-1);
const sortDirection = ref('asc');

const sortedRows = computed(() => {
  if (sortColumn.value >= 0 && props.sortable) {
    return [...props.rows].sort((a, b) => {
      const aVal = a[sortColumn.value];
      const bVal = b[sortColumn.value];
      if (aVal < bVal) return sortDirection.value === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection.value === 'asc' ? 1 : -1;
      return 0;
    });
  }
  return [...props.rows];
});

function handleSort(index) {
  if (!props.sortable) return;
  if (sortColumn.value === index) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn.value = index;
    sortDirection.value = 'asc';
  }
  emit('sort', { column: sortColumn.value, direction: sortDirection.value });
}
</script>

<style scoped>
.cn-table-wrapper {
  overflow-x: auto;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
}
.cn-table {
  width: 100%;
  border-collapse: collapse;
}
.cn-table th,
.cn-table td {
  padding: 12px 16px;
  text-align: left;
}
.cn-table th {
  background: #111111;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(240, 237, 232, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.cn-table th.sortable {
  cursor: pointer;
  user-select: none;
}
.cn-table th.sortable:hover {
  color: rgba(240, 237, 232, 0.8);
}
.cn-table td {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 13px;
  color: #f0ede8;
}
.cn-table tbody tr:last-child td {
  border-bottom: none;
}
.cn-table tbody tr:hover {
  background: #111111;
}
.sort-indicator {
  margin-left: 4px;
  opacity: 0.5;
}
.sort-indicator.active {
  opacity: 1;
}
</style>
