<template>
    <div v-if="dayjs">
        <month
            :dayjs="dayjs"
            :hideHeader="hideHeader"
            :firstWeekDay="firstWeekDay"
            :monthNumber="monthNumber"
            :eventDays="eventsDays"
            :pastEventsColors="pastEventsColors"
            :cellSize="cellSize"
            :yearNumber="yearNumber"
            :futureEventsColors="futureEventsColors"
        />
    </div>
</template>

<script>

import dayjs from 'dayjs'
const dayOfYear = require('dayjs/plugin/dayOfYear')
dayjs.extend(dayOfYear)
import Month from './Month.vue'
import Year from './Year.vue'
import { dinamicLoader } from './dinamicLoader'

export default{
    name: 'VueHmCalendar',
    props: {
        mode: {
            validator: function(value) {
                return ['month', 'year'].includes(value)
            },
        },
        firstWeekDay: {
            validator: function (value) {
                return ['monday', 'saturday'].includes(value)
            },
        },
        monthNumber: {
            type: Number,
            validator: function(value) {
                return /^[0-9]|10|11$/.test(value.toString())
            },
            default: dayjs().month(),
        },
        yearNumber: {
            type: Number,
            validator: function(value) {
                return /^[0-9]{1}|[0-9]{2}|[0-9]{3}|[0-9]{4}$/.test(value.toString())
            },
            default: dayjs().year(),
        },
        pastEventsColors: {
            type: Array,
            default: function() {
                return ['#66BB6A', '#388E3C', '#1B5E20']
            },
        },
        futureEventsColors: {
            type: Array,
            default: function() {
                return ['#BDBDBD', '#616161', '#212121']
            },
        },
        hideHeader: Boolean,
        eventsDays: Object,
        cellSize: String,
        hideWeekNames: Boolean,
        locale: String,
        tooltipTranslation: String,
    },
    components: {
        Month,
    },
    data() {
        return {
            dayjs: null,
        }
    },
    provide() {
        return {
            $tooltipTranslation: () => this.tooltipTranslation,
        }
    },
    async created() {
        if (this.locale) {
            this.dayjs = await dinamicLoader(this.locale, dayjs)
        } else {
            this.dayjs = dayjs
        }
    },
}

</script>
