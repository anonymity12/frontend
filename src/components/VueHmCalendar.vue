<template>
    <div v-if="dayjs">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="float: left;font-size: large;
                    font-weight: bold;">
                    任务完成统计
                </span>
            </div>
            <month :dayjs="dayjs" :hideHeader="hideHeader" :firstWeekDay="firstWeekDay" :monthNumber="monthNumber"
                :eventsDays="eventsDays" :pastEventsColors="pastEventsColors" :cellSize="cellSize" :yearNumber="yearNumber"
                :futureEventsColors="futureEventsColors" />
        </el-card>
        <div class="container">
            <div class="fire-block"></div>
            <div class="fire-block"></div>
            <div class="fire-block"></div>
            <div class="fire-block"></div>
            <div class="fire-block"></div>
            <div class="fire-block"></div>
            <div class="fire-block"></div>
        </div>
    </div>
</template>

<script>

import dayjs from 'dayjs'
const dayOfYear = require('dayjs/plugin/dayOfYear')
dayjs.extend(dayOfYear)
import Month from './Month.vue'
// import Year from './Year.vue'
import { dinamicLoader } from '../utils/dinamicLoader'

export default {
    name: 'VueHmCalendar',
    props: {
        mode: {
            validator: function (value) {
                return ['month', 'year'].includes(value)
            },
            default: 'year'
        },
        firstWeekDay: {
            validator: function (value) {
                return ['monday', 'saturday'].includes(value)
            },
            default: 'monday'
        },
        monthNumber: {
            type: Number,
            validator: function (value) {
                return /^[0-9]|10|11$/.test(value.toString())
            },
            default: dayjs().month(),
        },
        yearNumber: {
            type: Number,
            validator: function (value) {
                return /^[0-9]{1}|[0-9]{2}|[0-9]{3}|[0-9]{4}$/.test(value.toString())
            },
            default: dayjs().year(),
        },
        // we mainly use the previous:pastEventsColors color array
        pastEventsColors: {
            type: Array,
            default: function () {
                // return ['#a8d5ff', '#709fff', '#3869ff','#0033ff'] // blue series
                return ['#ffa99a', '#ff7e67', '#ff5233', '#ff2700'] // red series
                // return ['#FBEAFF', '#B39CD0', '#A281D1','#845EC2'] // purple series

            },
        },
        futureEventsColors: {
            type: Array,
            default: function () {
                return ['#d4bbeb', '#C0A5E1', '#A281D1', '#845EC2']
            },
        },
        hideHeader: { type: Boolean, default: false },
        hideWeekNames: { type: Boolean, default: false },
        eventsDays: Object,
        cellSize: String,
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
<style>
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    margin-top: 8px;
}

.container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.fire-block {
    position: relative;
    margin: 0.3rem;
    top: 1px;
    width: 1rem;
    height: 1rem;
    border-radius: 4px;
    background-color: rgba(136, 179, 6, 0.414);
    animation: waterFlow 2s infinite;
}

@keyframes waterFlow {

    /* 0% {
        background-position: 10% 10%;
    }

    100% {
        background-position: 100% 50%;
    } */
    0% {
        transform: translateY(-500%);
        margin-inline: 7px;
    }
    50% {
        transform: translateY(-350%);
        margin-inline: 7px;
    }

    100% {
        transform: translateX(0);
        margin-inline: -6px
    }
}
</style>
