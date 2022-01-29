import { defineComponent } from 'vue';
import './foo.css';

export const Foo = defineComponent({
    name: 'foo',
    setup() {
        return () => <div class='jsx'>From JSX</div>;
    },
});
