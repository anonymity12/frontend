<template>
    <div style="padding: 0.125rem;margin: 0.3rem;">
        <div :style="cellStyle + day.style" class="tooltip" :class="{ hovered: day.date }">
            <span v-if="day.date" :class="tooltipClass" class="tooltiptext" v-html="text"></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DayItem',
    props: {
        cellStyle: String,
        day: Object,
    },
    inject: ['$tooltipTranslation'],
    computed: {
        text() {
            if (this.$tooltipTranslation() && this.day.eventsCount) {
                return `${this.$tooltipTranslation()} ${this.day.eventsCount} <br/> ${this.day.date}`
            }
            return `${
                this.day.eventsCount
                    ? '你做了' + this.day.eventsCount + ' 件事在 <br/>'
                    : ''
            }${this.day.date}`
        },
        tooltipClass() {
            let className = ''
            if (this.day.dayOfYear > 309) {
                className = 'from_left_hand'
            }
            if (this.day.monthWeekday || this.day.monthWeekday === 0) {
                className = 'day' + this.day.monthWeekday
            }
            return className 
        },
    },
}
</script>
<style>
.tooltip {
    position: relative;
}
.hovered:hover {
    outline: 3px solid black;
}
.tooltip .tooltiptext {
    font-size: 15px;
    visibility: hidden;
    width: 125px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px 6px 6px 6px;
    opacity: 0.8;

    position: absolute;
    z-index: 1;
    bottom: 200%;
}

.from_left_hand {
    right: 50%;
}
.day0 {
    left: 30%;
}
.day1 {
    left: -80%;
}
.day2 {
    left: -200%;
}
.day3 {
    left: -320%;
}
.day4 {
    right: -230%;
}
.day5 {
    right: -80%;
}
.day6 {
    right: 50%;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
}
</style>
