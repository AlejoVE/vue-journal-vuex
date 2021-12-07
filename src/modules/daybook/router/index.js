export default {
    name: 'daybook',
    component: () => import(/* webpackChunkName: "DaybookLayout" */ '@/modules/daybook/layouts/DayBookLayout.vue'),
    children: [
        {
            path: '',
            name: 'no-entry',
            component: () => import(/* webpackChunkName: "NoEntrySelected" */ '@/modules/daybook/views/NoEntrySelected.vue')
        },
        {
            path: ':id',
            name: 'entry',
            component: () => import(/* webpackChunkName: "EntryView" */ '@/modules/daybook/views/EntryView.vue')
        }
    ]
}