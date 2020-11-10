<template lang="pug">
  table.table
    tr.table__head
      th.cell.checkbox
        b-form-checkbox(:checked="allCheckboxes" @change="toggleCheckAll")
      th.cell(v-for="key in mapKeys" :class="getClassByKey(key)") {{ tableMap[key].label }}
      th.cell

    tr.table__subhead(v-if="hasSublabels")
      td.cell.checkbox
      td.cell(v-for="key in mapKeys" :class="getClassByKey(key)")
        .checkmark-wrapper(v-if="checkType(key, 'CHECKMARKS')" )
          span(v-for="field in tableMap[key].sublabels") {{ field }}
      td.cell

    tr.table__row(
      v-for="index in indexes" 
      @click.prevent="setCheck(index)" 
      :class="{checked: tableCheckboxes[index]}"
    )
      td.cell.checkbox
        b-form-checkbox(
          :checked="tableCheckboxes[index]"
        )
      td.cell(v-for="key in mapKeys" :class="getClassByKey(key)")
        b-avatar(v-if="checkType(key, 'PHOTO')" :src="items[key][index]" square)
        span(v-else-if="checkType(key, 'CHECKMARK')") {{ items[key][index] ? 'Y' : 'N' }}
        template(v-else-if="checkType(key, 'CHECKMARKS')")
          .checkmark-wrapper(v-if="hasSublabels")
            span(v-for="field in tableMap[key].fields") {{ items[field][index] ? 'Y' : 'N' }}
        template(v-else)
          span(v-if="getLink(key, index)")
            nuxt-link(:to="getLink(key, index)") {{ items[key][index] }}
              b-badge(v-if="checkType(key, 'TEXTBADGE')") {{ items[tableMap[key].fields[0]][index] }}
          span(v-else) {{ items[key][index] }}
            b-badge(v-if="checkType(key, 'TEXTBADGE')") {{ items[tableMap[key].fields[0]][index] }}
      td.cell

</template>

<script lang="ts" src="./script.ts"></script>
<style lang="scss" src="./style.scss"></style>

import Vue from 'vue'

export type CellType =
  | 'ID'
  | 'TEXT'
  | 'TEXTBADGE'
  | 'PHOTO'
  | 'CHECKMARKS'
  | 'CHECKMARK'

export interface TableItems {
  [key: string]: Array<string | number | boolean>
}

export interface TableMap {
  [key: string]: {
    label: string // Название столбика
    type: CellType // Тип ячеек столбика
    link?: string // Поле с ссылками (для ID' | 'TEXT' | 'TEXTBADGE')
    class?: string // Дополнительные классы стилей для ячеек столбика
    fields?: Array<string> // Поля для "вложенных" таблиц или TEXTBADGE
    sublabels?: Array<string> // Названия столбиков для "вложенных" таблиц
  }
}

interface TableDataInterface {
  tableCheckboxes: { [key: string]: boolean }
  allCheckboxes: boolean
}

export default Vue.extend({
  props: {
    items: {
      type: Object,
      default: () => {},
    },
    tableMap: {
      type: Object,
      default: () => {},
    },
  },
  data: (): TableDataInterface => ({
    tableCheckboxes: {},
    allCheckboxes: false,
  }),
  computed: {
    hasSublabels(): boolean {
      for (const key in this.tableMap) {
        if ((this.tableMap as TableMap)[key].sublabels) {
          return true
        }
      }
      return false
    },
    indexes(): (string | number)[] {
      const keys = Object.keys(this.items)
      return Object.keys(this.items[keys[0]])
    },
    mapKeys(): string[] {
      return Object.keys(this.tableMap)
    },
  },
  methods: {
    // Html
    getClassByKey(key: string): string {
      let classes = ''
      if (this.tableMap[key].class) {
        classes = ' ' + this.tableMap[key].class
      }
      return this.tableMap[key].type.toLowerCase() + classes
    },
    checkType(key: string, type: CellType): boolean {
      return this.tableMap[key].type === type
    },
    getLink(key: string, index: number): string {
      if (!this.tableMap[key].link) return ''
      return this.items[this.tableMap[key].link][index].toString()
    },

    // Checkboxes
    setCheck(index: number | string): void {
      const stringIndex: string = index.toString()
      this.tableCheckboxes = Object.assign({}, this.tableCheckboxes, {
        [stringIndex]: !this.tableCheckboxes[stringIndex],
      })
      this.checkAllCheckboxes()
      this.$emit('checked', this.tableCheckboxes)
    },
    toggleCheckAll(value: boolean): void {
      if (value) {
        this.tableCheckboxes = Object.assign({
          ...this.indexes.map((el) => true),
        })
      } else {
        this.tableCheckboxes = {}
      }
      this.$emit('checked', this.tableCheckboxes)
    },
    checkAllCheckboxes(): void {
      for (const key in this.indexes) {
        if (!this.tableCheckboxes[key]) {
          if (this.allCheckboxes) this.allCheckboxes = false
          return
        }
      }
      if (!this.allCheckboxes) this.allCheckboxes = true
    },
  },
})

.table {
  position: relative;
  background: #ffffff;
  border-radius: 4px;
  font-size: 12px;
  line-height: 14px;

  .table__head {
    border-bottom: 1px solid #c4c4c4;
    color: #777777;
    white-space: nowrap;
  }

  .table__subhead {
    background: #f7f7f7;
    .cell {
      padding: 10px;
    }
    .cell.colored {
      background: #f2f2f2;
    }
  }

  .table__row {
    cursor: pointer;

    &.checked .cell {
      background: #f7f7f7;
    }
    &:hover .cell {
      background: #f2f2f2;
    }
  }

  .cell {
    border: none;
    vertical-align: middle;
    padding: 20px 15px;

    span {
      width: fit-content;

      a {
        color: inherit;
        text-decoration: none;
        display: flex;

        &:hover {
          color: #eb3934;
          .badge {
            background: #eb3934;
            color: #ffffff;
          }
        }
      }
    }

    // by TYPES
    &.checkbox {
      width: 16px;
    }
    &.id {
      width: 16px;
    }
    &.textbadge {
      span {
        display: flex;
        align-items: center;
        .badge {
          margin-left: 10px;
          background: #e2e2e2;
          border-radius: 20px;
          color: #000000;
          height: 16px;
          font-weight: normal;
          font-size: 10px;
          line-height: 10px;
        }
      }
    }
    &.photo {
      width: 90px;
      padding: 10px;
      .b-avatar {
        height: 63px;
        width: 63px;
      }
    }
    &.checkmark {
      text-align: center;
    }
    &.checkmarks {
      text-align: center;
      .checkmark-wrapper {
        display: flex;
        justify-content: center;
        span {
          padding: 0 10px;
        }
      }
    }

    // by ...
    &.center {
      text-align: center;
    }
    &.colored {
      background: #f7f7f7;
    }

    // by WIDTH
    &.width60 {
      width: 60px;
    }
    &.width100 {
      width: 100px;
    }
    &.width170 {
      width: 170px;
    }
    &.width250 {
      width: 250px;
    }
    &.width400 {
      width: 400px;
    }
  }
}
