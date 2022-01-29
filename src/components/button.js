import { createVNode, defineComponent } from 'vue';
import '../assets/button.css';

export default defineComponent({
    setup() {
        return () => createVNode(
            'div',
            {
                class: 'btn',
            },
            'dynamicBtn',
        );
    },
});
