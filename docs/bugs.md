# routine

## when click 更新

Error in render: "TypeError: Cannot read properties of undefined (reading 'routineContent')"

[Vue warn]: Property or method "routineToBeEdit" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property. See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.

found in

---> <RoutineEditDialog> at src/components/RoutineEditDialog.vue

fixed@2023-06-07 16:10:59; by using `this`;

from: `routineToBeEdit`

to `this.routineToBeEdit`



---

