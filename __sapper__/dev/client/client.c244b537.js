function noop() { }
const identity = x => x;
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function null_to_empty(value) {
    return value == null ? '' : value;
}

const is_client = typeof window !== 'undefined';
let now = is_client
    ? () => window.performance.now()
    : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        raf(run_tasks);
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
            tasks.delete(task);
        }
    };
}

function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
    return function (event) {
        event.preventDefault();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function children(element) {
    return Array.from(element.childNodes);
}
function claim_element(nodes, name, attributes, svg) {
    for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeName === name) {
            let j = 0;
            const remove = [];
            while (j < node.attributes.length) {
                const attribute = node.attributes[j++];
                if (!attributes[attribute.name]) {
                    remove.push(attribute.name);
                }
            }
            for (let k = 0; k < remove.length; k++) {
                node.removeAttribute(remove[k]);
            }
            return nodes.splice(i, 1)[0];
        }
    }
    return svg ? svg_element(name) : element(name);
}
function claim_text(nodes, data) {
    for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeType === 3) {
            node.data = '' + data;
            return nodes.splice(i, 1)[0];
        }
    }
    return text(data);
}
function claim_space(nodes) {
    return claim_text(nodes, ' ');
}
function set_style(node, key, value, important) {
    node.style.setProperty(key, value, important ? 'important' : '');
}
function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
}
function query_selector_all(selector, parent = document.body) {
    return Array.from(parent.querySelectorAll(selector));
}
class HtmlTag {
    constructor(anchor = null) {
        this.a = anchor;
        this.e = this.n = null;
    }
    m(html, target, anchor = null) {
        if (!this.e) {
            this.e = element(target.nodeName);
            this.t = target;
            this.h(html);
        }
        this.i(anchor);
    }
    h(html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.childNodes);
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert(this.t, this.n[i], anchor);
        }
    }
    p(html) {
        this.d();
        this.h(html);
        this.i(this.a);
    }
    d() {
        this.n.forEach(detach);
    }
}

const active_docs = new Set();
let active = 0;
// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
    let hash = 5381;
    let i = str.length;
    while (i--)
        hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
    return hash >>> 0;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = '{\n';
    for (let p = 0; p <= 1; p += step) {
        const t = a + (b - a) * ease(p);
        keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = node.ownerDocument;
    active_docs.add(doc);
    const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
    const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
    if (!current_rules[name]) {
        current_rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || '';
    node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
}
function delete_rule(node, name) {
    const previous = (node.style.animation || '').split(', ');
    const next = previous.filter(name
        ? anim => anim.indexOf(name) < 0 // remove specific animation
        : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
        node.style.animation = next.join(', ');
        active -= deleted;
        if (!active)
            clear_rules();
    }
}
function clear_rules() {
    raf(() => {
        if (active)
            return;
        active_docs.forEach(doc => {
            const stylesheet = doc.__svelte_stylesheet;
            let i = stylesheet.cssRules.length;
            while (i--)
                stylesheet.deleteRule(i);
            doc.__svelte_rules = {};
        });
        active_docs.clear();
    });
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail);
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
        }
    };
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        callbacks.slice().forEach(fn => fn(event));
    }
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}

let promise;
function wait() {
    if (!promise) {
        promise = Promise.resolve();
        promise.then(() => {
            promise = null;
        });
    }
    return promise;
}
function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}
const null_transition = { duration: 0 };
function create_in_transition(node, fn, params) {
    let config = fn(node, params);
    let running = false;
    let animation_name;
    let task;
    let uid = 0;
    function cleanup() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
        tick(0, 1);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        if (task)
            task.abort();
        running = true;
        add_render_callback(() => dispatch(node, true, 'start'));
        task = loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(1, 0);
                    dispatch(node, true, 'end');
                    cleanup();
                    return running = false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(t, 1 - t);
                }
            }
            return running;
        });
    }
    let started = false;
    return {
        start() {
            if (started)
                return;
            delete_rule(node);
            if (is_function(config)) {
                config = config();
                wait().then(go);
            }
            else {
                go();
            }
        },
        invalidate() {
            started = false;
        },
        end() {
            if (running) {
                cleanup();
                running = false;
            }
        }
    };
}
function create_out_transition(node, fn, params) {
    let config = fn(node, params);
    let running = true;
    let animation_name;
    const group = outros;
    group.r += 1;
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        add_render_callback(() => dispatch(node, false, 'start'));
        loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(0, 1);
                    dispatch(node, false, 'end');
                    if (!--group.r) {
                        // this will result in `end()` being called,
                        // so we don't need to clean up here
                        run_all(group.c);
                    }
                    return false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(1 - t, t);
                }
            }
            return running;
        });
    }
    if (is_function(config)) {
        wait().then(() => {
            // @ts-ignore
            config = config();
            go();
        });
    }
    else {
        go();
    }
    return {
        end(reset) {
            if (reset && config.tick) {
                config.tick(1, 0);
            }
            if (running) {
                if (animation_name)
                    delete_rule(node, animation_name);
                running = false;
            }
        }
    };
}
function create_bidirectional_transition(node, fn, params, intro) {
    let config = fn(node, params);
    let t = intro ? 0 : 1;
    let running_program = null;
    let pending_program = null;
    let animation_name = null;
    function clear_animation() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function init(program, duration) {
        const d = program.b - t;
        duration *= Math.abs(d);
        return {
            a: t,
            b: program.b,
            d,
            duration,
            start: program.start,
            end: program.start + duration,
            group: program.group
        };
    }
    function go(b) {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        const program = {
            start: now() + delay,
            b
        };
        if (!b) {
            // @ts-ignore todo: improve typings
            program.group = outros;
            outros.r += 1;
        }
        if (running_program || pending_program) {
            pending_program = program;
        }
        else {
            // if this is an intro, and there's a delay, we need to do
            // an initial tick and/or apply CSS animation immediately
            if (css) {
                clear_animation();
                animation_name = create_rule(node, t, b, duration, delay, easing, css);
            }
            if (b)
                tick(0, 1);
            running_program = init(program, duration);
            add_render_callback(() => dispatch(node, b, 'start'));
            loop(now => {
                if (pending_program && now > pending_program.start) {
                    running_program = init(pending_program, duration);
                    pending_program = null;
                    dispatch(node, running_program.b, 'start');
                    if (css) {
                        clear_animation();
                        animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                    }
                }
                if (running_program) {
                    if (now >= running_program.end) {
                        tick(t = running_program.b, 1 - t);
                        dispatch(node, running_program.b, 'end');
                        if (!pending_program) {
                            // we're done
                            if (running_program.b) {
                                // intro — we can tidy up immediately
                                clear_animation();
                            }
                            else {
                                // outro — needs to be coordinated
                                if (!--running_program.group.r)
                                    run_all(running_program.group.c);
                            }
                        }
                        running_program = null;
                    }
                    else if (now >= running_program.start) {
                        const p = now - running_program.start;
                        t = running_program.a + running_program.d * easing(p / running_program.duration);
                        tick(t, 1 - t);
                    }
                }
                return !!(running_program || pending_program);
            });
        }
    }
    return {
        run(b) {
            if (is_function(config)) {
                wait().then(() => {
                    // @ts-ignore
                    config = config();
                    go(b);
                });
            }
            else {
                go(b);
            }
        },
        end() {
            clear_animation();
            running_program = pending_program = null;
        }
    };
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}
function create_component(block) {
    block && block.c();
}
function claim_component(block, parent_nodes) {
    block && block.l(parent_nodes);
}
function mount_component(component, target, anchor) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    // onMount happens before the initial afterUpdate
    add_render_callback(() => {
        const new_on_destroy = on_mount.map(run).filter(is_function);
        if (on_destroy) {
            on_destroy.push(...new_on_destroy);
        }
        else {
            // Edge case - component was destroyed immediately,
            // most likely as a result of a binding initialising
            run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const prop_values = options.props || {};
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : []),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, prop_values, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor);
        flush();
    }
    set_current_component(parent_component);
}
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.29.4' }, detail)));
}
function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
    else
        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.wholeText === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error("'target' is a required option");
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn('Component was already destroyed'); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

const CONTEXT_KEY = {};

const preload = () => ({});

function cubicInOut(t) {
    return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
}
function cubicOut(t) {
    const f = t - 1.0;
    return f * f * f + 1.0;
}
function quartInOut(t) {
    return t < 0.5
        ? +8.0 * Math.pow(t, 4.0)
        : -8.0 * Math.pow(t - 1.0, 4.0) + 1.0;
}
function quintOut(t) {
    return --t * t * t * t * t + 1;
}

function blur(node, { delay = 0, duration = 400, easing = cubicInOut, amount = 5, opacity = 0 }) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const f = style.filter === 'none' ? '' : style.filter;
    const od = target_opacity * (1 - opacity);
    return {
        delay,
        duration,
        easing,
        css: (_t, u) => `opacity: ${target_opacity - (od * u)}; filter: ${f} blur(${u * amount}px);`
    };
}
function fade(node, { delay = 0, duration = 400, easing = identity }) {
    const o = +getComputedStyle(node).opacity;
    return {
        delay,
        duration,
        easing,
        css: t => `opacity: ${t * o}`
    };
}
function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 }) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === 'none' ? '' : style.transform;
    const od = target_opacity * (1 - opacity);
    return {
        delay,
        duration,
        easing,
        css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
    };
}
function slide(node, { delay = 0, duration = 400, easing = cubicOut }) {
    const style = getComputedStyle(node);
    const opacity = +style.opacity;
    const height = parseFloat(style.height);
    const padding_top = parseFloat(style.paddingTop);
    const padding_bottom = parseFloat(style.paddingBottom);
    const margin_top = parseFloat(style.marginTop);
    const margin_bottom = parseFloat(style.marginBottom);
    const border_top_width = parseFloat(style.borderTopWidth);
    const border_bottom_width = parseFloat(style.borderBottomWidth);
    return {
        delay,
        duration,
        easing,
        css: t => 'overflow: hidden;' +
            `opacity: ${Math.min(t * 20, 1) * opacity};` +
            `height: ${t * height}px;` +
            `padding-top: ${t * padding_top}px;` +
            `padding-bottom: ${t * padding_bottom}px;` +
            `margin-top: ${t * margin_top}px;` +
            `margin-bottom: ${t * margin_bottom}px;` +
            `border-top-width: ${t * border_top_width}px;` +
            `border-bottom-width: ${t * border_bottom_width}px;`
    };
}
function scale(node, { delay = 0, duration = 400, easing = cubicOut, start = 0, opacity = 0 }) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === 'none' ? '' : style.transform;
    const sd = 1 - start;
    const od = target_opacity * (1 - opacity);
    return {
        delay,
        duration,
        easing,
        css: (_t, u) => `
			transform: ${transform} scale(${1 - (sd * u)});
			opacity: ${target_opacity - (od * u)}
		`
    };
}
function draw(node, { delay = 0, speed, duration, easing = cubicInOut }) {
    const len = node.getTotalLength();
    if (duration === undefined) {
        if (speed === undefined) {
            duration = 800;
        }
        else {
            duration = len / speed;
        }
    }
    else if (typeof duration === 'function') {
        duration = duration(len);
    }
    return {
        delay,
        duration,
        easing,
        css: (t, u) => `stroke-dasharray: ${t * len} ${u * len}`
    };
}

/* src/components/global-components/navigation/Hamburger.svelte generated by Svelte v3.29.4 */
const file = "src/components/global-components/navigation/Hamburger.svelte";

function create_fragment(ctx) {
	let input;
	let t0;
	let label;
	let span0;
	let t1;
	let t2;
	let span2;
	let span1;

	const block = {
		c: function create() {
			input = element("input");
			t0 = space();
			label = element("label");
			span0 = element("span");
			t1 = text("Navigation");
			t2 = space();
			span2 = element("span");
			span1 = element("span");
			this.h();
		},
		l: function claim(nodes) {
			input = claim_element(nodes, "INPUT", { id: true, type: true, class: true });
			t0 = claim_space(nodes);
			label = claim_element(nodes, "LABEL", { id: true, for: true, class: true });
			var label_nodes = children(label);
			span0 = claim_element(label_nodes, "SPAN", { class: true });
			var span0_nodes = children(span0);
			t1 = claim_text(span0_nodes, "Navigation");
			span0_nodes.forEach(detach_dev);
			t2 = claim_space(label_nodes);
			span2 = claim_element(label_nodes, "SPAN", { class: true, title: true });
			var span2_nodes = children(span2);
			span1 = claim_element(span2_nodes, "SPAN", { class: true });
			children(span1).forEach(detach_dev);
			span2_nodes.forEach(detach_dev);
			label_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(input, "id", "toggle");
			attr_dev(input, "type", "checkbox");
			attr_dev(input, "class", "hide subnav-toggle hide-for-xlg svelte-ryg233");
			add_location(input, file, 133, 0, 3492);
			attr_dev(span0, "class", "show-for-sr svelte-ryg233");
			add_location(span0, file, 135, 4, 3629);
			attr_dev(span1, "class", "middle svelte-ryg233");
			add_location(span1, file, 137, 6, 3749);
			attr_dev(span2, "class", "hamburger svelte-ryg233");
			attr_dev(span2, "title", "Navigation");
			add_location(span2, file, 136, 4, 3677);
			attr_dev(label, "id", "nav-label");
			attr_dev(label, "for", "toggle");
			attr_dev(label, "class", "hide-for-xlg svelte-ryg233");
			add_location(label, file, 134, 0, 3568);
		},
		m: function mount(target, anchor) {
			insert_dev(target, input, anchor);
			insert_dev(target, t0, anchor);
			insert_dev(target, label, anchor);
			append_dev(label, span0);
			append_dev(span0, t1);
			append_dev(label, t2);
			append_dev(label, span2);
			append_dev(span2, span1);
			/*span2_binding*/ ctx[1](span2);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(input);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(label);
			/*span2_binding*/ ctx[1](null);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Hamburger", slots, []);
	let { hamburger } = $$props;
	const writable_props = ["hamburger"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Hamburger> was created with unknown prop '${key}'`);
	});

	function span2_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			hamburger = $$value;
			$$invalidate(0, hamburger);
		});
	}

	$$self.$$set = $$props => {
		if ("hamburger" in $$props) $$invalidate(0, hamburger = $$props.hamburger);
	};

	$$self.$capture_state = () => ({ onMount, afterUpdate, tick, hamburger });

	$$self.$inject_state = $$props => {
		if ("hamburger" in $$props) $$invalidate(0, hamburger = $$props.hamburger);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [hamburger, span2_binding];
}

class Hamburger extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { hamburger: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Hamburger",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*hamburger*/ ctx[0] === undefined && !("hamburger" in props)) {
			console.warn("<Hamburger> was created without expected prop 'hamburger'");
		}
	}

	get hamburger() {
		throw new Error("<Hamburger>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set hamburger(value) {
		throw new Error("<Hamburger>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/common-components/modals/ModalTemplate.svelte generated by Svelte v3.29.4 */
const file$1 = "src/components/common-components/modals/ModalTemplate.svelte";
const get_header_slot_changes = dirty => ({});
const get_header_slot_context = ctx => ({});

function create_fragment$1(ctx) {
	let div2;
	let div0;
	let t0;
	let div1;
	let t1;
	let div1_intro;
	let div1_outro;
	let div2_class_value;
	let div2_intro;
	let div2_outro;
	let current;
	let mounted;
	let dispose;
	const header_slot_template = /*#slots*/ ctx[2].header;
	const header_slot = create_slot(header_slot_template, ctx, /*$$scope*/ ctx[1], get_header_slot_context);
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

	const block = {
		c: function create() {
			div2 = element("div");
			div0 = element("div");
			t0 = space();
			div1 = element("div");
			if (header_slot) header_slot.c();
			t1 = space();
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			div2 = claim_element(nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div0 = claim_element(div2_nodes, "DIV", { class: true });
			children(div0).forEach(detach_dev);
			t0 = claim_space(div2_nodes);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			if (header_slot) header_slot.l(div1_nodes);
			t1 = claim_space(div1_nodes);
			if (default_slot) default_slot.l(div1_nodes);
			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "modal-background svelte-jkpavz");
			add_location(div0, file$1, 99, 4, 2753);
			attr_dev(div1, "class", "modal svelte-jkpavz");
			add_location(div1, file$1, 100, 1, 2800);
			attr_dev(div2, "class", div2_class_value = "center-all modal-container " + (/*showModal*/ ctx[0] ? "show-modal" : "") + " svelte-jkpavz");
			add_location(div2, file$1, 98, 0, 2658);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div0);
			append_dev(div2, t0);
			append_dev(div2, div1);

			if (header_slot) {
				header_slot.m(div1, null);
			}

			append_dev(div1, t1);

			if (default_slot) {
				default_slot.m(div1, null);
			}

			current = true;

			if (!mounted) {
				dispose = listen_dev(div0, "click", /*click_handler*/ ctx[3], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (header_slot) {
				if (header_slot.p && dirty & /*$$scope*/ 2) {
					update_slot(header_slot, header_slot_template, ctx, /*$$scope*/ ctx[1], dirty, get_header_slot_changes, get_header_slot_context);
				}
			}

			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 2) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[1], dirty, null, null);
				}
			}

			if (!current || dirty & /*showModal*/ 1 && div2_class_value !== (div2_class_value = "center-all modal-container " + (/*showModal*/ ctx[0] ? "show-modal" : "") + " svelte-jkpavz")) {
				attr_dev(div2, "class", div2_class_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(header_slot, local);
			transition_in(default_slot, local);

			add_render_callback(() => {
				if (div1_outro) div1_outro.end(1);
				if (!div1_intro) div1_intro = create_in_transition(div1, fly, { y: -20, duration: 450, delay: 200 });
				div1_intro.start();
			});

			add_render_callback(() => {
				if (div2_outro) div2_outro.end(1);
				if (!div2_intro) div2_intro = create_in_transition(div2, fade, {});
				div2_intro.start();
			});

			current = true;
		},
		o: function outro(local) {
			transition_out(header_slot, local);
			transition_out(default_slot, local);
			if (div1_intro) div1_intro.invalidate();
			div1_outro = create_out_transition(div1, fly, { y: -20, duration: 450 });
			if (div2_intro) div2_intro.invalidate();
			div2_outro = create_out_transition(div2, fade, {});
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			if (header_slot) header_slot.d(detaching);
			if (default_slot) default_slot.d(detaching);
			if (detaching && div1_outro) div1_outro.end();
			if (detaching && div2_outro) div2_outro.end();
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("ModalTemplate", slots, ['header','default']);
	let { showModal } = $$props;
	const dispatch = createEventDispatcher();
	const writable_props = ["showModal"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ModalTemplate> was created with unknown prop '${key}'`);
	});

	function click_handler(event) {
		bubble($$self, event);
	}

	$$self.$$set = $$props => {
		if ("showModal" in $$props) $$invalidate(0, showModal = $$props.showModal);
		if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher,
		fade,
		fly,
		showModal,
		dispatch
	});

	$$self.$inject_state = $$props => {
		if ("showModal" in $$props) $$invalidate(0, showModal = $$props.showModal);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [showModal, $$scope, slots, click_handler];
}

class ModalTemplate extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { showModal: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ModalTemplate",
			options,
			id: create_fragment$1.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*showModal*/ ctx[0] === undefined && !("showModal" in props)) {
			console.warn("<ModalTemplate> was created without expected prop 'showModal'");
		}
	}

	get showModal() {
		throw new Error("<ModalTemplate>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set showModal(value) {
		throw new Error("<ModalTemplate>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/common-components/loaders/BoxLoader.svelte generated by Svelte v3.29.4 */
const file$2 = "src/components/common-components/loaders/BoxLoader.svelte";

function create_fragment$2(ctx) {
	let div2;
	let div0;
	let t;
	let div1;
	let div2_intro;
	let div2_outro;
	let current;

	const block = {
		c: function create() {
			div2 = element("div");
			div0 = element("div");
			t = space();
			div1 = element("div");
			this.h();
		},
		l: function claim(nodes) {
			div2 = claim_element(nodes, "DIV", { id: true, class: true });
			var div2_nodes = children(div2);
			div0 = claim_element(div2_nodes, "DIV", { id: true, class: true });
			children(div0).forEach(detach_dev);
			t = claim_space(div2_nodes);
			div1 = claim_element(div2_nodes, "DIV", { id: true, class: true });
			children(div1).forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "id", "box");
			attr_dev(div0, "class", "svelte-12rrru0");
			add_location(div0, file$2, 86, 2, 1552);
			attr_dev(div1, "id", "hill");
			attr_dev(div1, "class", "svelte-12rrru0");
			add_location(div1, file$2, 87, 2, 1575);
			attr_dev(div2, "id", "loader");
			attr_dev(div2, "class", "svelte-12rrru0");
			add_location(div2, file$2, 85, 0, 1515);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div0);
			append_dev(div2, t);
			append_dev(div2, div1);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;

			add_render_callback(() => {
				if (div2_outro) div2_outro.end(1);
				if (!div2_intro) div2_intro = create_in_transition(div2, fade, {});
				div2_intro.start();
			});

			current = true;
		},
		o: function outro(local) {
			if (div2_intro) div2_intro.invalidate();
			div2_outro = create_out_transition(div2, fade, {});
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			if (detaching && div2_outro) div2_outro.end();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("BoxLoader", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<BoxLoader> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ fade });
	return [];
}

class BoxLoader extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "BoxLoader",
			options,
			id: create_fragment$2.name
		});
	}
}

/* src/components/common-components/modals/ContactModal.svelte generated by Svelte v3.29.4 */

const { Object: Object_1, console: console_1 } = globals;
const file$3 = "src/components/common-components/modals/ContactModal.svelte";

// (260:0) {#if showModal && hideModal === false}
function create_if_block(ctx) {
	let modaltemplate;
	let current;

	modaltemplate = new ModalTemplate({
			props: {
				showModal: /*showModal*/ ctx[0],
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	modaltemplate.$on("click", /*click_handler*/ ctx[8]);

	const block = {
		c: function create() {
			create_component(modaltemplate.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(modaltemplate.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(modaltemplate, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const modaltemplate_changes = {};
			if (dirty & /*showModal*/ 1) modaltemplate_changes.showModal = /*showModal*/ ctx[0];

			if (dirty & /*$$scope, formState, fieldInputs*/ 2054) {
				modaltemplate_changes.$$scope = { dirty, ctx };
			}

			modaltemplate.$set(modaltemplate_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(modaltemplate.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(modaltemplate.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(modaltemplate, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(260:0) {#if showModal && hideModal === false}",
		ctx
	});

	return block;
}

// (289:16) {#if formState.submittingForm}
function create_if_block_3(ctx) {
	let boxloader;
	let current;
	boxloader = new BoxLoader({ $$inline: true });

	const block = {
		c: function create() {
			create_component(boxloader.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(boxloader.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(boxloader, target, anchor);
			current = true;
		},
		i: function intro(local) {
			if (current) return;
			transition_in(boxloader.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(boxloader.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(boxloader, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(289:16) {#if formState.submittingForm}",
		ctx
	});

	return block;
}

// (292:16) {#if formState.formSuccess}
function create_if_block_2(ctx) {
	let h2;
	let t;
	let h2_intro;
	let h2_outro;
	let current;

	const block = {
		c: function create() {
			h2 = element("h2");
			t = text("SUCCESS");
			this.h();
		},
		l: function claim(nodes) {
			h2 = claim_element(nodes, "H2", { class: true });
			var h2_nodes = children(h2);
			t = claim_text(h2_nodes, "SUCCESS");
			h2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h2, "class", "success-message svelte-1k2z3aj");
			add_location(h2, file$3, 292, 20, 8505);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h2, anchor);
			append_dev(h2, t);
			current = true;
		},
		i: function intro(local) {
			if (current) return;

			add_render_callback(() => {
				if (h2_outro) h2_outro.end(1);
				if (!h2_intro) h2_intro = create_in_transition(h2, fly, { y: 20, duration: 500, delay: 200 });
				h2_intro.start();
			});

			current = true;
		},
		o: function outro(local) {
			if (h2_intro) h2_intro.invalidate();
			h2_outro = create_out_transition(h2, fly, { y: -20, duration: 500, delay: 0 });
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h2);
			if (detaching && h2_outro) h2_outro.end();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(292:16) {#if formState.formSuccess}",
		ctx
	});

	return block;
}

// (300:16) {#if formState.formError}
function create_if_block_1(ctx) {
	let h2;
	let t;
	let h2_intro;
	let h2_outro;
	let current;

	const block = {
		c: function create() {
			h2 = element("h2");
			t = text("ERROR");
			this.h();
		},
		l: function claim(nodes) {
			h2 = claim_element(nodes, "H2", { class: true });
			var h2_nodes = children(h2);
			t = claim_text(h2_nodes, "ERROR");
			h2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h2, "class", "success-message svelte-1k2z3aj");
			add_location(h2, file$3, 300, 20, 8844);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h2, anchor);
			append_dev(h2, t);
			current = true;
		},
		i: function intro(local) {
			if (current) return;

			add_render_callback(() => {
				if (h2_outro) h2_outro.end(1);
				if (!h2_intro) h2_intro = create_in_transition(h2, fly, { y: 20, duration: 500, delay: 200 });
				h2_intro.start();
			});

			current = true;
		},
		o: function outro(local) {
			if (h2_intro) h2_intro.invalidate();
			h2_outro = create_out_transition(h2, fly, { y: -20, duration: 500, delay: 0 });
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h2);
			if (detaching && h2_outro) h2_outro.end();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(300:16) {#if formState.formError}",
		ctx
	});

	return block;
}

// (261:1) <ModalTemplate showModal={showModal} on:click>
function create_default_slot(ctx) {
	let div2;
	let div1;
	let div0;
	let h2;
	let t0;
	let t1;
	let p;
	let t2;
	let div0_class_value;
	let t3;
	let form;
	let label0;
	let span0;
	let t4;
	let t5;
	let input0;
	let t6;
	let label1;
	let span1;
	let t7;
	let t8;
	let input1;
	let t9;
	let label2;
	let span2;
	let t10;
	let t11;
	let textarea;
	let t12;
	let input2;
	let form_class_value;
	let t13;
	let t14;
	let t15;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*formState*/ ctx[2].submittingForm && create_if_block_3(ctx);
	let if_block1 = /*formState*/ ctx[2].formSuccess && create_if_block_2(ctx);
	let if_block2 = /*formState*/ ctx[2].formError && create_if_block_1(ctx);

	const block = {
		c: function create() {
			div2 = element("div");
			div1 = element("div");
			div0 = element("div");
			h2 = element("h2");
			t0 = text("Get In Touch");
			t1 = space();
			p = element("p");
			t2 = text("Hi there! I’m Josh, \n                            I bring projects to life by innovating across each aspect of the customer journey. \n                            Send me a message if you are looking to hire a developer, collaborate on a project, or have a potential business opportunity.");
			t3 = space();
			form = element("form");
			label0 = element("label");
			span0 = element("span");
			t4 = text("Name");
			t5 = space();
			input0 = element("input");
			t6 = space();
			label1 = element("label");
			span1 = element("span");
			t7 = text("Email");
			t8 = space();
			input1 = element("input");
			t9 = space();
			label2 = element("label");
			span2 = element("span");
			t10 = text("Message");
			t11 = space();
			textarea = element("textarea");
			t12 = space();
			input2 = element("input");
			t13 = space();
			if (if_block0) if_block0.c();
			t14 = space();
			if (if_block1) if_block1.c();
			t15 = space();
			if (if_block2) if_block2.c();
			this.h();
		},
		l: function claim(nodes) {
			div2 = claim_element(nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			h2 = claim_element(div0_nodes, "H2", { class: true });
			var h2_nodes = children(h2);
			t0 = claim_text(h2_nodes, "Get In Touch");
			h2_nodes.forEach(detach_dev);
			t1 = claim_space(div0_nodes);
			p = claim_element(div0_nodes, "P", { class: true });
			var p_nodes = children(p);
			t2 = claim_text(p_nodes, "Hi there! I’m Josh, \n                            I bring projects to life by innovating across each aspect of the customer journey. \n                            Send me a message if you are looking to hire a developer, collaborate on a project, or have a potential business opportunity.");
			p_nodes.forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			t3 = claim_space(div1_nodes);
			form = claim_element(div1_nodes, "FORM", { class: true });
			var form_nodes = children(form);
			label0 = claim_element(form_nodes, "LABEL", { class: true });
			var label0_nodes = children(label0);
			span0 = claim_element(label0_nodes, "SPAN", { class: true });
			var span0_nodes = children(span0);
			t4 = claim_text(span0_nodes, "Name");
			span0_nodes.forEach(detach_dev);
			t5 = claim_space(label0_nodes);
			input0 = claim_element(label0_nodes, "INPUT", { name: true, type: true, class: true });
			label0_nodes.forEach(detach_dev);
			t6 = claim_space(form_nodes);
			label1 = claim_element(form_nodes, "LABEL", { class: true });
			var label1_nodes = children(label1);
			span1 = claim_element(label1_nodes, "SPAN", { class: true });
			var span1_nodes = children(span1);
			t7 = claim_text(span1_nodes, "Email");
			span1_nodes.forEach(detach_dev);
			t8 = claim_space(label1_nodes);

			input1 = claim_element(label1_nodes, "INPUT", {
				required: true,
				name: true,
				type: true,
				class: true
			});

			label1_nodes.forEach(detach_dev);
			t9 = claim_space(form_nodes);
			label2 = claim_element(form_nodes, "LABEL", { class: true });
			var label2_nodes = children(label2);
			span2 = claim_element(label2_nodes, "SPAN", { class: true });
			var span2_nodes = children(span2);
			t10 = claim_text(span2_nodes, "Message");
			span2_nodes.forEach(detach_dev);
			t11 = claim_space(label2_nodes);

			textarea = claim_element(label2_nodes, "TEXTAREA", {
				name: true,
				rows: true,
				type: true,
				class: true
			});

			children(textarea).forEach(detach_dev);
			label2_nodes.forEach(detach_dev);
			t12 = claim_space(form_nodes);
			input2 = claim_element(form_nodes, "INPUT", { type: true, value: true, class: true });
			form_nodes.forEach(detach_dev);
			t13 = claim_space(div1_nodes);
			if (if_block0) if_block0.l(div1_nodes);
			t14 = claim_space(div1_nodes);
			if (if_block1) if_block1.l(div1_nodes);
			t15 = claim_space(div1_nodes);
			if (if_block2) if_block2.l(div1_nodes);
			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h2, "class", "svelte-1k2z3aj");
			add_location(h2, file$3, 264, 24, 6998);
			attr_dev(p, "class", "svelte-1k2z3aj");
			add_location(p, file$3, 265, 24, 7044);
			attr_dev(div0, "class", div0_class_value = "text-container " + (/*formState*/ ctx[2].hideFields ? "hide-content" : "") + " " + (/*formState*/ ctx[2].hideFields ? "hide-content" : "") + " svelte-1k2z3aj");
			add_location(div0, file$3, 263, 20, 6855);
			attr_dev(span0, "class", "svelte-1k2z3aj");
			add_location(span0, file$3, 276, 32, 7719);
			attr_dev(input0, "name", "name");
			attr_dev(input0, "type", "text");
			attr_dev(input0, "class", "svelte-1k2z3aj");
			add_location(input0, file$3, 277, 28, 7765);
			attr_dev(label0, "class", "svelte-1k2z3aj");
			add_location(label0, file$3, 276, 24, 7711);
			attr_dev(span1, "class", "svelte-1k2z3aj");
			add_location(span1, file$3, 279, 32, 7889);
			input1.required = true;
			attr_dev(input1, "name", "email");
			attr_dev(input1, "type", "email");
			attr_dev(input1, "class", "svelte-1k2z3aj");
			add_location(input1, file$3, 280, 28, 7936);
			attr_dev(label1, "class", "svelte-1k2z3aj");
			add_location(label1, file$3, 279, 24, 7881);
			attr_dev(span2, "class", "svelte-1k2z3aj");
			add_location(span2, file$3, 282, 32, 8071);
			attr_dev(textarea, "name", "message");
			attr_dev(textarea, "rows", "6");
			attr_dev(textarea, "type", "textarea");
			attr_dev(textarea, "class", "svelte-1k2z3aj");
			add_location(textarea, file$3, 283, 28, 8120);
			attr_dev(label2, "class", "svelte-1k2z3aj");
			add_location(label2, file$3, 282, 24, 8063);
			attr_dev(input2, "type", "submit");
			input2.value = "Send Message";
			attr_dev(input2, "class", "svelte-1k2z3aj");
			add_location(input2, file$3, 285, 24, 8266);
			attr_dev(form, "class", form_class_value = "gform " + (/*formState*/ ctx[2].hideFields ? "hide-content" : "") + "\n                        " + (/*formState*/ ctx[2].formSuccess ? "hide-content" : "") + " svelte-1k2z3aj");
			add_location(form, file$3, 271, 20, 7439);
			attr_dev(div1, "class", "flex-container svelte-1k2z3aj");
			add_location(div1, file$3, 262, 12, 6806);
			attr_dev(div2, "class", "form-container svelte-1k2z3aj");
			add_location(div2, file$3, 261, 8, 6765);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div1);
			append_dev(div1, div0);
			append_dev(div0, h2);
			append_dev(h2, t0);
			append_dev(div0, t1);
			append_dev(div0, p);
			append_dev(p, t2);
			append_dev(div1, t3);
			append_dev(div1, form);
			append_dev(form, label0);
			append_dev(label0, span0);
			append_dev(span0, t4);
			append_dev(label0, t5);
			append_dev(label0, input0);
			/*input0_binding*/ ctx[5](input0);
			append_dev(form, t6);
			append_dev(form, label1);
			append_dev(label1, span1);
			append_dev(span1, t7);
			append_dev(label1, t8);
			append_dev(label1, input1);
			/*input1_binding*/ ctx[6](input1);
			append_dev(form, t9);
			append_dev(form, label2);
			append_dev(label2, span2);
			append_dev(span2, t10);
			append_dev(label2, t11);
			append_dev(label2, textarea);
			/*textarea_binding*/ ctx[7](textarea);
			append_dev(form, t12);
			append_dev(form, input2);
			append_dev(div1, t13);
			if (if_block0) if_block0.m(div1, null);
			append_dev(div1, t14);
			if (if_block1) if_block1.m(div1, null);
			append_dev(div1, t15);
			if (if_block2) if_block2.m(div1, null);
			current = true;

			if (!mounted) {
				dispose = listen_dev(form, "submit", prevent_default(/*handleSubmit*/ ctx[4]), false, true, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (!current || dirty & /*formState*/ 4 && div0_class_value !== (div0_class_value = "text-container " + (/*formState*/ ctx[2].hideFields ? "hide-content" : "") + " " + (/*formState*/ ctx[2].hideFields ? "hide-content" : "") + " svelte-1k2z3aj")) {
				attr_dev(div0, "class", div0_class_value);
			}

			if (!current || dirty & /*formState*/ 4 && form_class_value !== (form_class_value = "gform " + (/*formState*/ ctx[2].hideFields ? "hide-content" : "") + "\n                        " + (/*formState*/ ctx[2].formSuccess ? "hide-content" : "") + " svelte-1k2z3aj")) {
				attr_dev(form, "class", form_class_value);
			}

			if (/*formState*/ ctx[2].submittingForm) {
				if (if_block0) {
					if (dirty & /*formState*/ 4) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_3(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(div1, t14);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (/*formState*/ ctx[2].formSuccess) {
				if (if_block1) {
					if (dirty & /*formState*/ 4) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_2(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(div1, t15);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (/*formState*/ ctx[2].formError) {
				if (if_block2) {
					if (dirty & /*formState*/ 4) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block_1(ctx);
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(div1, null);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			transition_in(if_block2);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			transition_out(if_block2);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			/*input0_binding*/ ctx[5](null);
			/*input1_binding*/ ctx[6](null);
			/*textarea_binding*/ ctx[7](null);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(261:1) <ModalTemplate showModal={showModal} on:click>",
		ctx
	});

	return block;
}

function create_fragment$3(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*showModal*/ ctx[0] && /*hideModal*/ ctx[3] === false && create_if_block(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*showModal*/ ctx[0] && /*hideModal*/ ctx[3] === false) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*showModal*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function buildFormSubmissionTextObj(formEventTarget, formFieldNames) {
	let formData = new FormData();

	formFieldNames.forEach(fieldName => {
		formData.append(`${fieldName}`, `${formEventTarget[fieldName].value}`);
	});

	return formData;
}

function instance$3($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("ContactModal", slots, []);
	let { showModal } = $$props;
	let hideModal = false;
	let fieldInputs = [];

	let formState = {
		submittingForm: false,
		formSuccess: false,
		formError: false,
		hideFields: false
	};

	let defaultFormState = formState;

	function resetForm(wait) {
		setTimeout(
			() => {
				const stateObj = Object.entries(formState);

				for (const [stateKey, stateValue] of stateObj) {
					$$invalidate(2, formState[stateKey] = false, formState);
				}

				fieldInputs.forEach(input => {
					input.value = "";
				});
			},
			wait
		);
	}

	async function handleSubmit(e) {
		$$invalidate(2, formState.submittingForm = true, formState);
		$$invalidate(2, formState.hideFields = true, formState);
		$$invalidate(2, formState.formSuccess = false, formState);
		const formFieldNames = ["name", "email", "message"]; // TODO - generate field names based on inputs
		const formTextObj = buildFormSubmissionTextObj(e.target, formFieldNames);
		const API_URL = `https://script.google.com/macros/s/AKfycbydbaWHTARcBeJS1auLdnBSNhDZ0yO-SYbGH0AllA/exec`;
		const settings = { method: "POST", body: formTextObj };

		try {
			const response = await fetch(API_URL, settings);
			const data = await response.json();
			$$invalidate(2, formState.submittingForm = false, formState);
			$$invalidate(2, formState.formSuccess = true, formState);
			resetForm(1600);
		} catch(e) {
			$$invalidate(2, formState.submittingForm = false, formState);
			$$invalidate(2, formState.formError = true, formState);
			console.log("error submitting form", e);
			resetForm(1600);
		}
	}

	const writable_props = ["showModal"];

	Object_1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<ContactModal> was created with unknown prop '${key}'`);
	});

	function input0_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			fieldInputs[0] = $$value;
			$$invalidate(1, fieldInputs);
		});
	}

	function input1_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			fieldInputs[1] = $$value;
			$$invalidate(1, fieldInputs);
		});
	}

	function textarea_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			fieldInputs[2] = $$value;
			$$invalidate(1, fieldInputs);
		});
	}

	function click_handler(event) {
		bubble($$self, event);
	}

	$$self.$$set = $$props => {
		if ("showModal" in $$props) $$invalidate(0, showModal = $$props.showModal);
	};

	$$self.$capture_state = () => ({
		fade,
		fly,
		ModalTemplate,
		BoxLoader,
		showModal,
		hideModal,
		fieldInputs,
		formState,
		defaultFormState,
		resetForm,
		handleSubmit,
		buildFormSubmissionTextObj
	});

	$$self.$inject_state = $$props => {
		if ("showModal" in $$props) $$invalidate(0, showModal = $$props.showModal);
		if ("hideModal" in $$props) $$invalidate(3, hideModal = $$props.hideModal);
		if ("fieldInputs" in $$props) $$invalidate(1, fieldInputs = $$props.fieldInputs);
		if ("formState" in $$props) $$invalidate(2, formState = $$props.formState);
		if ("defaultFormState" in $$props) defaultFormState = $$props.defaultFormState;
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		showModal,
		fieldInputs,
		formState,
		hideModal,
		handleSubmit,
		input0_binding,
		input1_binding,
		textarea_binding,
		click_handler
	];
}

class ContactModal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3, create_fragment$3, safe_not_equal, { showModal: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ContactModal",
			options,
			id: create_fragment$3.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*showModal*/ ctx[0] === undefined && !("showModal" in props)) {
			console_1.warn("<ContactModal> was created without expected prop 'showModal'");
		}
	}

	get showModal() {
		throw new Error("<ContactModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set showModal(value) {
		throw new Error("<ContactModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/global-components/navigation/Logo.svelte generated by Svelte v3.29.4 */
const file$4 = "src/components/global-components/navigation/Logo.svelte";

// (105:0) {#if enableFullAnimation && visible}
function create_if_block_3$1(ctx) {
	let svg;
	let defs;
	let style;
	let t;
	let svg_outro;
	let current;
	let if_block = /*toggleFullAnimation*/ ctx[3] && create_if_block_4(ctx);

	const block = {
		c: function create() {
			svg = svg_element("svg");
			defs = svg_element("defs");
			style = svg_element("style");
			t = text(".cls-1 {\n  fill: #231f20;\n}\n      ");
			if (if_block) if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			svg = claim_element(
				nodes,
				"svg",
				{
					id: true,
					xmlns: true,
					viewBox: true,
					class: true
				},
				1
			);

			var svg_nodes = children(svg);
			defs = claim_element(svg_nodes, "defs", { class: true }, 1);
			var defs_nodes = children(defs);
			style = claim_element(defs_nodes, "style", { class: true }, 1);
			var style_nodes = children(style);
			t = claim_text(style_nodes, ".cls-1 {\n  fill: #231f20;\n}\n      ");
			style_nodes.forEach(detach_dev);
			defs_nodes.forEach(detach_dev);
			if (if_block) if_block.l(svg_nodes);
			svg_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(style, "class", "svelte-dgkgwu");
			add_location(style, file$4, 112, 6, 3370);
			attr_dev(defs, "class", "svelte-dgkgwu");
			add_location(defs, file$4, 111, 4, 3357);
			attr_dev(svg, "id", "logo-full-animation");
			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr_dev(svg, "viewBox", "0 0 139.7 125.7");
			attr_dev(svg, "class", "svelte-dgkgwu");
			add_location(svg, file$4, 105, 2, 3179);
		},
		m: function mount(target, anchor) {
			insert_dev(target, svg, anchor);
			append_dev(svg, defs);
			append_dev(defs, style);
			append_dev(style, t);
			if (if_block) if_block.m(svg, null);
			current = true;
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (/*toggleFullAnimation*/ ctx[3]) {
				if (if_block) {
					if (dirty & /*toggleFullAnimation*/ 8) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_4(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(svg, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			if (svg_outro) svg_outro.end(1);
			current = true;
		},
		o: function outro(local) {
			svg_outro = create_out_transition(svg, scale, {
				duration: 450,
				delay: 0,
				easing: quartInOut
			});

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(svg);
			if (if_block) if_block.d();
			if (detaching && svg_outro) svg_outro.end();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3$1.name,
		type: "if",
		source: "(105:0) {#if enableFullAnimation && visible}",
		ctx
	});

	return block;
}

// (119:4) {#if toggleFullAnimation}
function create_if_block_4(ctx) {
	let g;
	let path0;
	let path0_intro;
	let polygon0;
	let polygon0_intro;
	let path1;
	let path1_intro;
	let polygon1;
	let polygon1_intro;

	const block = {
		c: function create() {
			g = svg_element("g");
			path0 = svg_element("path");
			polygon0 = svg_element("polygon");
			path1 = svg_element("path");
			polygon1 = svg_element("polygon");
			this.h();
		},
		l: function claim(nodes) {
			g = claim_element(nodes, "g", { class: true }, 1);
			var g_nodes = children(g);

			path0 = claim_element(
				g_nodes,
				"path",
				{
					id: true,
					style: true,
					class: true,
					d: true
				},
				1
			);

			children(path0).forEach(detach_dev);

			polygon0 = claim_element(
				g_nodes,
				"polygon",
				{
					style: true,
					id: true,
					class: true,
					points: true
				},
				1
			);

			children(polygon0).forEach(detach_dev);

			path1 = claim_element(
				g_nodes,
				"path",
				{
					id: true,
					style: true,
					class: true,
					d: true
				},
				1
			);

			children(path1).forEach(detach_dev);

			polygon1 = claim_element(
				g_nodes,
				"polygon",
				{
					style: true,
					id: true,
					class: true,
					points: true
				},
				1
			);

			children(polygon1).forEach(detach_dev);
			g_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "id", "R");
			set_style(path0, "stroke", "#797777");
			set_style(path0, "stroke-width", "1");
			attr_dev(path0, "class", "cls-1 svelte-dgkgwu");
			attr_dev(path0, "d", "M84.8,30.7h45.4V25.1H71.6V46H84a4.2,4.2,0,1,1,0,8.4H71.6V74.3h6.7l12.3,25.8h26.1L100.9,69.4a22.8,22.8,0,0,0,10.3-18.8H114V39.3H102.8V50.6h2.7a17.3,17.3,0,0,1-9.7,15.2l-2.5,1.3.4.8,13.7,26.5H94.1L81.9,68.6H77.2V60H84a9.8,9.8,0,1,0,0-19.6H77.2V30.7Z");
			add_location(path0, file$4, 120, 8, 3481);
			set_style(polygon0, "stroke", "#797777");
			set_style(polygon0, "stroke-width", "1");
			attr_dev(polygon0, "id", "BOTTOM-Line");
			attr_dev(polygon0, "class", "cls-1 svelte-dgkgwu");
			attr_dev(polygon0, "points", "128.5 43.4 128.5 54.6 128.8 54.6 131.2 54.6 131.2 120.1 15.2 120.1 15.2 95 9.5 95 9.5 125.7 9.9 125.7 15.2 125.7 131.2 125.7 136.9 125.7 136.9 120.1 136.9 54.6 139.3 54.6 139.7 54.6 139.7 43.4 128.5 43.4");
			add_location(polygon0, file$4, 127, 8, 3945);
			attr_dev(path1, "id", "J");
			set_style(path1, "stroke", "#797777");
			set_style(path1, "stroke-width", "1");
			attr_dev(path1, "class", "cls-1 svelte-dgkgwu");
			attr_dev(path1, "d", "M43.3,25.1v48c0,4.6-2,6.7-6.2,6.7H34.7V77H23.5V88.2H34.7V85.5h2.4c7.3,0,11.9-4.8,11.9-12.4V30.7H60.3V73.5C60.3,88.3,48.6,95,37.1,95H9.5v5.7H37.1a31.3,31.3,0,0,0,19.6-6.6c6-4.9,9.2-12.1,9.2-20.6V25.1Z");
			add_location(path1, file$4, 134, 8, 4385);
			set_style(polygon1, "stroke", "#797777");
			set_style(polygon1, "stroke-width", "1");
			attr_dev(polygon1, "id", "TOP-Line");
			attr_dev(polygon1, "class", "cls-1 svelte-dgkgwu");
			attr_dev(polygon1, "points", "129.7 0 124.5 0 8.4 0 2.8 0 2.8 5.7 2.8 71.1 0.3 71.1 0 71.1 0 82.4 11.2 82.4 11.2 71.1 10.9 71.1 8.4 71.1 8.4 5.7 124.5 5.7 124.5 30.7 130.2 30.7 130.2 0 129.7 0");
			add_location(polygon1, file$4, 141, 8, 4801);
			attr_dev(g, "class", "svelte-dgkgwu");
			add_location(g, file$4, 119, 6, 3469);
		},
		m: function mount(target, anchor) {
			insert_dev(target, g, anchor);
			append_dev(g, path0);
			append_dev(g, polygon0);
			append_dev(g, path1);
			append_dev(g, polygon1);
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
		},
		i: function intro(local) {
			if (!path0_intro) {
				add_render_callback(() => {
					path0_intro = create_in_transition(path0, draw, {
						duration: 3250,
						delay: 1500,
						easing: quartInOut
					});

					path0_intro.start();
				});
			}

			if (!polygon0_intro) {
				add_render_callback(() => {
					polygon0_intro = create_in_transition(polygon0, draw, {
						duration: /*duration*/ ctx[4],
						delay: 0,
						easing: quartInOut
					});

					polygon0_intro.start();
				});
			}

			if (!path1_intro) {
				add_render_callback(() => {
					path1_intro = create_in_transition(path1, draw, {
						duration: 3250,
						delay: 1500,
						easing: quartInOut
					});

					path1_intro.start();
				});
			}

			if (!polygon1_intro) {
				add_render_callback(() => {
					polygon1_intro = create_in_transition(polygon1, draw, {
						duration: /*duration*/ ctx[4],
						delay: 500,
						easing: quartInOut
					});

					polygon1_intro.start();
				});
			}
		},
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(119:4) {#if toggleFullAnimation}",
		ctx
	});

	return block;
}

// (154:0) {#if !enableFullAnimation && visible}
function create_if_block$1(ctx) {
	let svg;
	let defs;
	let style;
	let t;
	let g;
	let path0;
	let path1;
	let current;
	let if_block0 = !/*isBoxVisible*/ ctx[1] && create_if_block_2$1(ctx);
	let if_block1 = !/*isBoxVisible*/ ctx[1] && create_if_block_1$1(ctx);

	const block = {
		c: function create() {
			svg = svg_element("svg");
			defs = svg_element("defs");
			style = svg_element("style");
			t = text(".cls-1 {\n  fill: #231f20;\n}\n      ");
			g = svg_element("g");
			path0 = svg_element("path");
			if (if_block0) if_block0.c();
			path1 = svg_element("path");
			if (if_block1) if_block1.c();
			this.h();
		},
		l: function claim(nodes) {
			svg = claim_element(
				nodes,
				"svg",
				{
					id: true,
					xmlns: true,
					viewBox: true,
					class: true
				},
				1
			);

			var svg_nodes = children(svg);
			defs = claim_element(svg_nodes, "defs", { class: true }, 1);
			var defs_nodes = children(defs);
			style = claim_element(defs_nodes, "style", { class: true }, 1);
			var style_nodes = children(style);
			t = claim_text(style_nodes, ".cls-1 {\n  fill: #231f20;\n}\n      ");
			style_nodes.forEach(detach_dev);
			defs_nodes.forEach(detach_dev);
			g = claim_element(svg_nodes, "g", { class: true }, 1);
			var g_nodes = children(g);
			path0 = claim_element(g_nodes, "path", { id: true, class: true, d: true }, 1);
			children(path0).forEach(detach_dev);
			if (if_block0) if_block0.l(g_nodes);
			path1 = claim_element(g_nodes, "path", { id: true, class: true, d: true }, 1);
			children(path1).forEach(detach_dev);
			if (if_block1) if_block1.l(g_nodes);
			g_nodes.forEach(detach_dev);
			svg_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(style, "class", "svelte-dgkgwu");
			add_location(style, file$4, 160, 6, 5390);
			attr_dev(defs, "class", "svelte-dgkgwu");
			add_location(defs, file$4, 159, 4, 5377);
			attr_dev(path0, "id", "R");
			attr_dev(path0, "class", "cls-1 svelte-dgkgwu");
			attr_dev(path0, "d", "M84.8,30.7h45.4V25.1H71.6V46H84a4.2,4.2,0,1,1,0,8.4H71.6V74.3h6.7l12.3,25.8h26.1L100.9,69.4a22.8,22.8,0,0,0,10.3-18.8H114V39.3H102.8V50.6h2.7a17.3,17.3,0,0,1-9.7,15.2l-2.5,1.3.4.8,13.7,26.5H94.1L81.9,68.6H77.2V60H84a9.8,9.8,0,1,0,0-19.6H77.2V30.7Z");
			add_location(path0, file$4, 167, 6, 5467);
			attr_dev(path1, "id", "J");
			attr_dev(path1, "class", "cls-1 svelte-dgkgwu");
			attr_dev(path1, "d", "M43.3,25.1v48c0,4.6-2,6.7-6.2,6.7H34.7V77H23.5V88.2H34.7V85.5h2.4c7.3,0,11.9-4.8,11.9-12.4V30.7H60.3V73.5C60.3,88.3,48.6,95,37.1,95H9.5v5.7H37.1a31.3,31.3,0,0,0,19.6-6.6c6-4.9,9.2-12.1,9.2-20.6V25.1Z");
			add_location(path1, file$4, 181, 6, 6246);
			attr_dev(g, "class", "svelte-dgkgwu");
			add_location(g, file$4, 166, 4, 5457);
			attr_dev(svg, "id", "JR-Logo-Squere");
			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr_dev(svg, "viewBox", "0 0 139.7 125.7");
			attr_dev(svg, "class", "svelte-dgkgwu");
			add_location(svg, file$4, 154, 2, 5268);
		},
		m: function mount(target, anchor) {
			insert_dev(target, svg, anchor);
			append_dev(svg, defs);
			append_dev(defs, style);
			append_dev(style, t);
			append_dev(svg, g);
			append_dev(g, path0);
			if (if_block0) if_block0.m(g, null);
			append_dev(g, path1);
			if (if_block1) if_block1.m(g, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (!/*isBoxVisible*/ ctx[1]) {
				if (if_block0) {
					if (dirty & /*isBoxVisible*/ 2) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_2$1(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(g, path1);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (!/*isBoxVisible*/ ctx[1]) {
				if (if_block1) {
					if (dirty & /*isBoxVisible*/ 2) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_1$1(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(g, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(svg);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(154:0) {#if !enableFullAnimation && visible}",
		ctx
	});

	return block;
}

// (173:6) {#if !isBoxVisible}
function create_if_block_2$1(ctx) {
	let polygon;
	let polygon_intro;
	let polygon_outro;
	let current;

	const block = {
		c: function create() {
			polygon = svg_element("polygon");
			this.h();
		},
		l: function claim(nodes) {
			polygon = claim_element(nodes, "polygon", { id: true, class: true, points: true }, 1);
			children(polygon).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polygon, "id", "BOTTOM-Line");
			attr_dev(polygon, "class", "cls-1 svelte-dgkgwu");
			attr_dev(polygon, "points", "128.5 43.4 128.5 54.6 128.8 54.6 131.2 54.6 131.2 120.1 15.2 120.1 15.2 95 9.5 95 9.5 125.7 9.9 125.7 15.2 125.7 131.2 125.7 136.9 125.7 136.9 120.1 136.9 54.6 139.3 54.6 139.7 54.6 139.7 43.4 128.5 43.4");
			add_location(polygon, file$4, 173, 8, 5822);
		},
		m: function mount(target, anchor) {
			insert_dev(target, polygon, anchor);
			current = true;
		},
		i: function intro(local) {
			if (current) return;

			add_render_callback(() => {
				if (polygon_outro) polygon_outro.end(1);
				if (!polygon_intro) polygon_intro = create_in_transition(polygon, fade, { duration: 400, delay: 0 });
				polygon_intro.start();
			});

			current = true;
		},
		o: function outro(local) {
			if (polygon_intro) polygon_intro.invalidate();
			polygon_outro = create_out_transition(polygon, fade, { duration: 250, delay: 0 });
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(polygon);
			if (detaching && polygon_outro) polygon_outro.end();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$1.name,
		type: "if",
		source: "(173:6) {#if !isBoxVisible}",
		ctx
	});

	return block;
}

// (187:6) {#if !isBoxVisible}
function create_if_block_1$1(ctx) {
	let polygon;
	let polygon_intro;
	let polygon_outro;
	let current;

	const block = {
		c: function create() {
			polygon = svg_element("polygon");
			this.h();
		},
		l: function claim(nodes) {
			polygon = claim_element(nodes, "polygon", { id: true, class: true, points: true }, 1);
			children(polygon).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polygon, "id", "TOP-Line");
			attr_dev(polygon, "class", "cls-1 svelte-dgkgwu");
			attr_dev(polygon, "points", "129.7 0 124.5 0 8.4 0 2.8 0 2.8 5.7 2.8 71.1 0.3 71.1 0 71.1 0 82.4 11.2 82.4 11.2 71.1 10.9 71.1 8.4 71.1 8.4 5.7 124.5 5.7 124.5 30.7 130.2 30.7 130.2 0 129.7 0");
			add_location(polygon, file$4, 187, 8, 6553);
		},
		m: function mount(target, anchor) {
			insert_dev(target, polygon, anchor);
			current = true;
		},
		i: function intro(local) {
			if (current) return;

			add_render_callback(() => {
				if (polygon_outro) polygon_outro.end(1);
				if (!polygon_intro) polygon_intro = create_in_transition(polygon, fade, { duration: 400, delay: 0 });
				polygon_intro.start();
			});

			current = true;
		},
		o: function outro(local) {
			if (polygon_intro) polygon_intro.invalidate();
			polygon_outro = create_out_transition(polygon, fade, { duration: 250, delay: 0 });
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(polygon);
			if (detaching && polygon_outro) polygon_outro.end();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$1.name,
		type: "if",
		source: "(187:6) {#if !isBoxVisible}",
		ctx
	});

	return block;
}

function create_fragment$4(ctx) {
	let t;
	let if_block1_anchor;
	let current;
	let if_block0 = /*enableFullAnimation*/ ctx[0] && /*visible*/ ctx[2] && create_if_block_3$1(ctx);
	let if_block1 = !/*enableFullAnimation*/ ctx[0] && /*visible*/ ctx[2] && create_if_block$1(ctx);

	const block = {
		c: function create() {
			if (if_block0) if_block0.c();
			t = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
		},
		l: function claim(nodes) {
			if (if_block0) if_block0.l(nodes);
			t = claim_space(nodes);
			if (if_block1) if_block1.l(nodes);
			if_block1_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert_dev(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, if_block1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*enableFullAnimation*/ ctx[0] && /*visible*/ ctx[2]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*enableFullAnimation, visible*/ 5) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_3$1(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t.parentNode, t);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (!/*enableFullAnimation*/ ctx[0] && /*visible*/ ctx[2]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*enableFullAnimation, visible*/ 5) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block$1(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach_dev(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(if_block1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Logo", slots, []);

	let { enableFullAnimation } = $$props,
		{ isBoxVisible } = $$props,
		{ visible = true } = $$props;

	let duration = 2750;
	let toggleFullAnimation = false;

	onMount(() => {
		$$invalidate(3, toggleFullAnimation = enableFullAnimation ? true : false);

		if (toggleFullAnimation) {
			setTimeout(
				() => {
					document.querySelectorAll("polygon").forEach(polygon => {
						polygon.style.fill = "#797777";
						polygon.style.stroke = "white";
					});

					document.querySelectorAll("path").forEach(path => {
						path.style.fill = "#797777";
						path.style.stroke = "white";
					});
				},
				2600
			);
		}
	});

	const writable_props = ["enableFullAnimation", "isBoxVisible", "visible"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Logo> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("enableFullAnimation" in $$props) $$invalidate(0, enableFullAnimation = $$props.enableFullAnimation);
		if ("isBoxVisible" in $$props) $$invalidate(1, isBoxVisible = $$props.isBoxVisible);
		if ("visible" in $$props) $$invalidate(2, visible = $$props.visible);
	};

	$$self.$capture_state = () => ({
		onMount,
		draw,
		fade,
		blur,
		slide,
		scale,
		quintOut,
		quartInOut,
		enableFullAnimation,
		isBoxVisible,
		visible,
		duration,
		toggleFullAnimation
	});

	$$self.$inject_state = $$props => {
		if ("enableFullAnimation" in $$props) $$invalidate(0, enableFullAnimation = $$props.enableFullAnimation);
		if ("isBoxVisible" in $$props) $$invalidate(1, isBoxVisible = $$props.isBoxVisible);
		if ("visible" in $$props) $$invalidate(2, visible = $$props.visible);
		if ("duration" in $$props) $$invalidate(4, duration = $$props.duration);
		if ("toggleFullAnimation" in $$props) $$invalidate(3, toggleFullAnimation = $$props.toggleFullAnimation);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [enableFullAnimation, isBoxVisible, visible, toggleFullAnimation, duration];
}

class Logo extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
			enableFullAnimation: 0,
			isBoxVisible: 1,
			visible: 2
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Logo",
			options,
			id: create_fragment$4.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*enableFullAnimation*/ ctx[0] === undefined && !("enableFullAnimation" in props)) {
			console.warn("<Logo> was created without expected prop 'enableFullAnimation'");
		}

		if (/*isBoxVisible*/ ctx[1] === undefined && !("isBoxVisible" in props)) {
			console.warn("<Logo> was created without expected prop 'isBoxVisible'");
		}
	}

	get enableFullAnimation() {
		throw new Error("<Logo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set enableFullAnimation(value) {
		throw new Error("<Logo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isBoxVisible() {
		throw new Error("<Logo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isBoxVisible(value) {
		throw new Error("<Logo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get visible() {
		throw new Error("<Logo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set visible(value) {
		throw new Error("<Logo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/common-components/TextAnimation.svelte generated by Svelte v3.29.4 */

const file$5 = "src/components/common-components/TextAnimation.svelte";

function create_fragment$5(ctx) {
	let span1;
	let span0;
	let t;

	const block = {
		c: function create() {
			span1 = element("span");
			span0 = element("span");
			t = text(/*text*/ ctx[0]);
			this.h();
		},
		l: function claim(nodes) {
			span1 = claim_element(nodes, "SPAN", { class: true });
			var span1_nodes = children(span1);
			span0 = claim_element(span1_nodes, "SPAN", { class: true });
			var span0_nodes = children(span0);
			t = claim_text(span0_nodes, /*text*/ ctx[0]);
			span0_nodes.forEach(detach_dev);
			span1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span0, "class", "text-animation svelte-1tkdw4z");
			add_location(span0, file$5, 81, 4, 2433);
			attr_dev(span1, "class", "hover-animation svelte-1tkdw4z");
			add_location(span1, file$5, 80, 0, 2398);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span1, anchor);
			append_dev(span1, span0);
			append_dev(span0, t);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*text*/ 1) set_data_dev(t, /*text*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(span1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$5.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$5($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("TextAnimation", slots, []);
	let { text } = $$props;
	const writable_props = ["text"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<TextAnimation> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("text" in $$props) $$invalidate(0, text = $$props.text);
	};

	$$self.$capture_state = () => ({ text });

	$$self.$inject_state = $$props => {
		if ("text" in $$props) $$invalidate(0, text = $$props.text);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [text];
}

class TextAnimation extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$5, create_fragment$5, safe_not_equal, { text: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "TextAnimation",
			options,
			id: create_fragment$5.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*text*/ ctx[0] === undefined && !("text" in props)) {
			console.warn("<TextAnimation> was created without expected prop 'text'");
		}
	}

	get text() {
		throw new Error("<TextAnimation>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set text(value) {
		throw new Error("<TextAnimation>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/global-components/navigation/Navigation.svelte generated by Svelte v3.29.4 */

const { Object: Object_1$1, window: window_1 } = globals;
const file$6 = "src/components/global-components/navigation/Navigation.svelte";

// (382:0) {#if loadComponents}
function create_if_block$2(ctx) {
	let header;
	let nav;
	let a0;
	let logo0;
	let t0;
	let hamburger_1;
	let t1;
	let div0;
	let t2;
	let div7;
	let div2;
	let logo1;
	let t3;
	let div1;
	let span;
	let t4;
	let ul;
	let li0;
	let a1;
	let t5;
	let li0_class_value;
	let li0_intro;
	let t6;
	let li1;
	let a2;
	let t7;
	let li1_class_value;
	let li1_intro;
	let t8;
	let li2;
	let a3;
	let t9;
	let li2_class_value;
	let li2_intro;
	let t10;
	let li3;
	let a4;
	let t11;
	let li3_class_value;
	let li3_intro;
	let t12;
	let li4;
	let a5;
	let t13;
	let li4_class_value;
	let li4_intro;
	let ul_class_value;
	let t14;
	let div6;
	let div3;
	let p0;
	let t15;
	let t16;
	let a6;
	let t17;
	let t18;
	let div4;
	let p1;
	let t19;
	let t20;
	let a7;
	let t21;
	let t22;
	let div5;
	let a8;
	let i0;
	let t23;
	let a9;
	let i1;
	let t24;
	let a10;
	let i2;
	let nav_class_value;
	let header_intro;
	let current;
	let mounted;
	let dispose;
	logo0 = new Logo({ $$inline: true });
	let hamburger_1_props = { toggle: /*toggle*/ ctx[7] };
	hamburger_1 = new Hamburger({ props: hamburger_1_props, $$inline: true });
	/*hamburger_1_binding*/ ctx[13](hamburger_1);

	logo1 = new Logo({
			props: { isBoxVisible: true },
			$$inline: true
		});

	const block = {
		c: function create() {
			header = element("header");
			nav = element("nav");
			a0 = element("a");
			create_component(logo0.$$.fragment);
			t0 = space();
			create_component(hamburger_1.$$.fragment);
			t1 = space();
			div0 = element("div");
			t2 = space();
			div7 = element("div");
			div2 = element("div");
			create_component(logo1.$$.fragment);
			t3 = space();
			div1 = element("div");
			span = element("span");
			t4 = space();
			ul = element("ul");
			li0 = element("li");
			a1 = element("a");
			t5 = text("Home");
			t6 = space();
			li1 = element("li");
			a2 = element("a");
			t7 = text("About");
			t8 = space();
			li2 = element("li");
			a3 = element("a");
			t9 = text("Projects");
			t10 = space();
			li3 = element("li");
			a4 = element("a");
			t11 = text("Experience");
			t12 = space();
			li4 = element("li");
			a5 = element("a");
			t13 = text("Contact");
			t14 = space();
			div6 = element("div");
			div3 = element("div");
			p0 = element("p");
			t15 = text("Get In Touch!");
			t16 = space();
			a6 = element("a");
			t17 = text("Joshua.micah.roper@gmail.com");
			t18 = space();
			div4 = element("div");
			p1 = element("p");
			t19 = text("View Resume");
			t20 = space();
			a7 = element("a");
			t21 = text("Download PDF");
			t22 = space();
			div5 = element("div");
			a8 = element("a");
			i0 = element("i");
			t23 = space();
			a9 = element("a");
			i1 = element("i");
			t24 = space();
			a10 = element("a");
			i2 = element("i");
			this.h();
		},
		l: function claim(nodes) {
			header = claim_element(nodes, "HEADER", { class: true });
			var header_nodes = children(header);
			nav = claim_element(header_nodes, "NAV", { class: true });
			var nav_nodes = children(nav);
			a0 = claim_element(nav_nodes, "A", { href: true, class: true });
			var a0_nodes = children(a0);
			claim_component(logo0.$$.fragment, a0_nodes);
			a0_nodes.forEach(detach_dev);
			t0 = claim_space(nav_nodes);
			claim_component(hamburger_1.$$.fragment, nav_nodes);
			t1 = claim_space(nav_nodes);
			div0 = claim_element(nav_nodes, "DIV", { class: true });
			children(div0).forEach(detach_dev);
			t2 = claim_space(nav_nodes);
			div7 = claim_element(nav_nodes, "DIV", { class: true });
			var div7_nodes = children(div7);
			div2 = claim_element(div7_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			claim_component(logo1.$$.fragment, div2_nodes);
			t3 = claim_space(div2_nodes);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			span = claim_element(div1_nodes, "SPAN", { class: true });
			children(span).forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			t4 = claim_space(div7_nodes);
			ul = claim_element(div7_nodes, "UL", { class: true });
			var ul_nodes = children(ul);
			li0 = claim_element(ul_nodes, "LI", { class: true });
			var li0_nodes = children(li0);
			a1 = claim_element(li0_nodes, "A", { class: true, rel: true, href: true });
			var a1_nodes = children(a1);
			t5 = claim_text(a1_nodes, "Home");
			a1_nodes.forEach(detach_dev);
			li0_nodes.forEach(detach_dev);
			t6 = claim_space(ul_nodes);
			li1 = claim_element(ul_nodes, "LI", { class: true });
			var li1_nodes = children(li1);
			a2 = claim_element(li1_nodes, "A", { class: true, rel: true, href: true });
			var a2_nodes = children(a2);
			t7 = claim_text(a2_nodes, "About");
			a2_nodes.forEach(detach_dev);
			li1_nodes.forEach(detach_dev);
			t8 = claim_space(ul_nodes);
			li2 = claim_element(ul_nodes, "LI", { class: true });
			var li2_nodes = children(li2);
			a3 = claim_element(li2_nodes, "A", { class: true, rel: true, href: true });
			var a3_nodes = children(a3);
			t9 = claim_text(a3_nodes, "Projects");
			a3_nodes.forEach(detach_dev);
			li2_nodes.forEach(detach_dev);
			t10 = claim_space(ul_nodes);
			li3 = claim_element(ul_nodes, "LI", { class: true });
			var li3_nodes = children(li3);
			a4 = claim_element(li3_nodes, "A", { class: true, rel: true, href: true });
			var a4_nodes = children(a4);
			t11 = claim_text(a4_nodes, "Experience");
			a4_nodes.forEach(detach_dev);
			li3_nodes.forEach(detach_dev);
			t12 = claim_space(ul_nodes);
			li4 = claim_element(ul_nodes, "LI", { class: true });
			var li4_nodes = children(li4);
			a5 = claim_element(li4_nodes, "A", { class: true, href: true });
			var a5_nodes = children(a5);
			t13 = claim_text(a5_nodes, "Contact");
			a5_nodes.forEach(detach_dev);
			li4_nodes.forEach(detach_dev);
			ul_nodes.forEach(detach_dev);
			t14 = claim_space(div7_nodes);
			div6 = claim_element(div7_nodes, "DIV", { class: true });
			var div6_nodes = children(div6);
			div3 = claim_element(div6_nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			p0 = claim_element(div3_nodes, "P", { class: true });
			var p0_nodes = children(p0);
			t15 = claim_text(p0_nodes, "Get In Touch!");
			p0_nodes.forEach(detach_dev);
			t16 = claim_space(div3_nodes);
			a6 = claim_element(div3_nodes, "A", { href: true, class: true });
			var a6_nodes = children(a6);
			t17 = claim_text(a6_nodes, "Joshua.micah.roper@gmail.com");
			a6_nodes.forEach(detach_dev);
			div3_nodes.forEach(detach_dev);
			t18 = claim_space(div6_nodes);
			div4 = claim_element(div6_nodes, "DIV", { class: true });
			var div4_nodes = children(div4);
			p1 = claim_element(div4_nodes, "P", { class: true });
			var p1_nodes = children(p1);
			t19 = claim_text(p1_nodes, "View Resume");
			p1_nodes.forEach(detach_dev);
			t20 = claim_space(div4_nodes);
			a7 = claim_element(div4_nodes, "A", { href: true, download: true, class: true });
			var a7_nodes = children(a7);
			t21 = claim_text(a7_nodes, "Download PDF");
			a7_nodes.forEach(detach_dev);
			div4_nodes.forEach(detach_dev);
			t22 = claim_space(div6_nodes);
			div5 = claim_element(div6_nodes, "DIV", { class: true });
			var div5_nodes = children(div5);

			a8 = claim_element(div5_nodes, "A", {
				class: true,
				href: true,
				"aria-label": true,
				target: true,
				rel: true
			});

			var a8_nodes = children(a8);
			i0 = claim_element(a8_nodes, "I", { class: true });
			children(i0).forEach(detach_dev);
			a8_nodes.forEach(detach_dev);
			t23 = claim_space(div5_nodes);

			a9 = claim_element(div5_nodes, "A", {
				class: true,
				href: true,
				"aria-label": true,
				target: true,
				rel: true
			});

			var a9_nodes = children(a9);
			i1 = claim_element(a9_nodes, "I", { class: true });
			children(i1).forEach(detach_dev);
			a9_nodes.forEach(detach_dev);
			t24 = claim_space(div5_nodes);

			a10 = claim_element(div5_nodes, "A", {
				class: true,
				href: true,
				"aria-label": true
			});

			var a10_nodes = children(a10);
			i2 = claim_element(a10_nodes, "I", { class: true });
			children(i2).forEach(detach_dev);
			a10_nodes.forEach(detach_dev);
			div5_nodes.forEach(detach_dev);
			div6_nodes.forEach(detach_dev);
			div7_nodes.forEach(detach_dev);
			nav_nodes.forEach(detach_dev);
			header_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(a0, "href", "/");
			attr_dev(a0, "class", "logo svelte-118kcj1");
			add_location(a0, file$6, 385, 16, 8873);
			attr_dev(div0, "class", "background svelte-118kcj1");
			add_location(div0, file$6, 397, 16, 9538);
			attr_dev(span, "class", "close svelte-118kcj1");
			add_location(span, file$6, 404, 28, 9887);
			attr_dev(div1, "class", "close-container svelte-118kcj1");
			add_location(div1, file$6, 403, 24, 9807);
			attr_dev(div2, "class", "mobile-top svelte-118kcj1");
			add_location(div2, file$6, 399, 20, 9652);
			attr_dev(a1, "class", "nav-item svelte-118kcj1");
			attr_dev(a1, "rel", "prefetch");
			attr_dev(a1, "href", "/");
			add_location(a1, file$6, 413, 28, 10316);
			attr_dev(li0, "class", li0_class_value = "" + (null_to_empty(/*segment*/ ctx[0] === undefined ? "selected" : "") + " svelte-118kcj1"));
			add_location(li0, file$6, 409, 24, 10101);
			attr_dev(a2, "class", "nav-item svelte-118kcj1");
			attr_dev(a2, "rel", "prefetch");
			attr_dev(a2, "href", "/about");
			add_location(a2, file$6, 419, 28, 10665);
			attr_dev(li1, "class", li1_class_value = "" + (null_to_empty(/*segment*/ ctx[0] === "about" ? "selected" : "") + " svelte-118kcj1"));
			add_location(li1, file$6, 415, 24, 10452);
			attr_dev(a3, "class", "nav-item svelte-118kcj1");
			attr_dev(a3, "rel", "prefetch");
			attr_dev(a3, "href", "/projects");
			add_location(a3, file$6, 425, 28, 11023);
			attr_dev(li2, "class", li2_class_value = "" + (null_to_empty(/*segment*/ ctx[0] === "projects" ? "selected" : "") + " svelte-118kcj1"));
			add_location(li2, file$6, 421, 24, 10807);
			attr_dev(a4, "class", "nav-item svelte-118kcj1");
			attr_dev(a4, "rel", "prefetch");
			attr_dev(a4, "href", "/experience");
			add_location(a4, file$6, 431, 28, 11389);
			attr_dev(li3, "class", li3_class_value = "" + (null_to_empty(/*segment*/ ctx[0] === "experience" ? "selected" : "") + " svelte-118kcj1"));
			add_location(li3, file$6, 427, 24, 11171);
			attr_dev(a5, "class", "nav-item svelte-118kcj1");
			attr_dev(a5, "href", "javascript:void(0)");
			add_location(a5, file$6, 437, 28, 11755);
			attr_dev(li4, "class", li4_class_value = "" + ((/*showModal*/ ctx[2] ? "selected" : "") + " open-modal" + " svelte-118kcj1"));
			add_location(li4, file$6, 433, 24, 11541);
			attr_dev(ul, "class", ul_class_value = "navigation-list " + (/*showModal*/ ctx[2] ? "modal-active" : "") + " svelte-118kcj1");
			add_location(ul, file$6, 408, 20, 10014);
			attr_dev(p0, "class", "title svelte-118kcj1");
			add_location(p0, file$6, 444, 28, 12031);
			attr_dev(a6, "href", "mailto:joshua.micah.roper@gmail.com");
			attr_dev(a6, "class", "svelte-118kcj1");
			add_location(a6, file$6, 447, 28, 12156);
			attr_dev(div3, "class", "text-cta svelte-118kcj1");
			add_location(div3, file$6, 443, 24, 11980);
			attr_dev(p1, "class", "title svelte-118kcj1");
			add_location(p1, file$6, 453, 28, 12500);
			attr_dev(a7, "href", "./pdfs/resume-joshua-roper.pdf");
			attr_dev(a7, "download", "");
			attr_dev(a7, "class", "svelte-118kcj1");
			add_location(a7, file$6, 456, 28, 12623);
			attr_dev(div4, "class", "text-cta svelte-118kcj1");
			add_location(div4, file$6, 452, 24, 12449);
			attr_dev(i0, "class", "fab fa-github svelte-118kcj1");
			add_location(i0, file$6, 464, 32, 13121);
			attr_dev(a8, "class", "social-icon svelte-118kcj1");
			attr_dev(a8, "href", "https://www.github.com/Jrope21");
			attr_dev(a8, "aria-label", "link to Joshua Roper's GitHub account");
			attr_dev(a8, "target", "_blank");
			attr_dev(a8, "rel", "noopener");
			add_location(a8, file$6, 463, 28, 12944);
			attr_dev(i1, "class", "fab fa-linkedin svelte-118kcj1");
			add_location(i1, file$6, 467, 32, 13395);
			attr_dev(a9, "class", "social-icon svelte-118kcj1");
			attr_dev(a9, "href", "https://www.linkedin.com/in/JR-dev");
			attr_dev(a9, "aria-label", "link to Joshua Roper's LinkedIn account");
			attr_dev(a9, "target", "_blank");
			attr_dev(a9, "rel", "noopener");
			add_location(a9, file$6, 466, 28, 13212);
			attr_dev(i2, "class", "fas fa-envelope svelte-118kcj1");
			add_location(i2, file$6, 470, 32, 13636);
			attr_dev(a10, "class", "social-icon svelte-118kcj1");
			attr_dev(a10, "href", "mailto:joshua.micah.roper@gmail.com");
			attr_dev(a10, "aria-label", "link to send Joshua Roper an email");
			add_location(a10, file$6, 469, 28, 13488);
			attr_dev(div5, "class", "social-icons svelte-118kcj1");
			add_location(div5, file$6, 462, 24, 12889);
			attr_dev(div6, "class", "mobile-bottom svelte-118kcj1");
			add_location(div6, file$6, 442, 20, 11928);
			attr_dev(div7, "class", "navigation svelte-118kcj1");
			add_location(div7, file$6, 398, 16, 9607);

			attr_dev(nav, "class", nav_class_value = "" + (null_to_empty(/*reduceNavSize*/ ctx[5]
			? "scrolled container"
			: "container") + " svelte-118kcj1"));

			add_location(nav, file$6, 383, 8, 8779);
			attr_dev(header, "class", "svelte-118kcj1");
			add_location(header, file$6, 382, 4, 8714);
		},
		m: function mount(target, anchor) {
			insert_dev(target, header, anchor);
			append_dev(header, nav);
			append_dev(nav, a0);
			mount_component(logo0, a0, null);
			append_dev(nav, t0);
			mount_component(hamburger_1, nav, null);
			append_dev(nav, t1);
			append_dev(nav, div0);
			append_dev(nav, t2);
			append_dev(nav, div7);
			append_dev(div7, div2);
			mount_component(logo1, div2, null);
			append_dev(div2, t3);
			append_dev(div2, div1);
			append_dev(div1, span);
			append_dev(div7, t4);
			append_dev(div7, ul);
			append_dev(ul, li0);
			append_dev(li0, a1);
			append_dev(a1, t5);
			append_dev(ul, t6);
			append_dev(ul, li1);
			append_dev(li1, a2);
			append_dev(a2, t7);
			append_dev(ul, t8);
			append_dev(ul, li2);
			append_dev(li2, a3);
			append_dev(a3, t9);
			append_dev(ul, t10);
			append_dev(ul, li3);
			append_dev(li3, a4);
			append_dev(a4, t11);
			append_dev(ul, t12);
			append_dev(ul, li4);
			append_dev(li4, a5);
			append_dev(a5, t13);
			append_dev(div7, t14);
			append_dev(div7, div6);
			append_dev(div6, div3);
			append_dev(div3, p0);
			append_dev(p0, t15);
			append_dev(div3, t16);
			append_dev(div3, a6);
			append_dev(a6, t17);
			append_dev(div6, t18);
			append_dev(div6, div4);
			append_dev(div4, p1);
			append_dev(p1, t19);
			append_dev(div4, t20);
			append_dev(div4, a7);
			append_dev(a7, t21);
			append_dev(div6, t22);
			append_dev(div6, div5);
			append_dev(div5, a8);
			append_dev(a8, i0);
			append_dev(div5, t23);
			append_dev(div5, a9);
			append_dev(a9, i1);
			append_dev(div5, t24);
			append_dev(div5, a10);
			append_dev(a10, i2);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(a0, "click", /*click_handler*/ ctx[12], false, false, false),
					listen_dev(div0, "click", togglerOff, false, false, false),
					listen_dev(div1, "click", togglerOff, false, false, false),
					listen_dev(a1, "click", /*setActiveNavOnClick*/ ctx[9], false, false, false),
					listen_dev(a2, "click", /*setActiveNavOnClick*/ ctx[9], false, false, false),
					listen_dev(a3, "click", /*setActiveNavOnClick*/ ctx[9], false, false, false),
					listen_dev(a4, "click", /*setActiveNavOnClick*/ ctx[9], false, false, false),
					listen_dev(a5, "click", /*openModal*/ ctx[10], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			const hamburger_1_changes = {};
			hamburger_1.$set(hamburger_1_changes);

			if (!current || dirty & /*segment*/ 1 && li0_class_value !== (li0_class_value = "" + (null_to_empty(/*segment*/ ctx[0] === undefined ? "selected" : "") + " svelte-118kcj1"))) {
				attr_dev(li0, "class", li0_class_value);
			}

			if (!current || dirty & /*segment*/ 1 && li1_class_value !== (li1_class_value = "" + (null_to_empty(/*segment*/ ctx[0] === "about" ? "selected" : "") + " svelte-118kcj1"))) {
				attr_dev(li1, "class", li1_class_value);
			}

			if (!current || dirty & /*segment*/ 1 && li2_class_value !== (li2_class_value = "" + (null_to_empty(/*segment*/ ctx[0] === "projects" ? "selected" : "") + " svelte-118kcj1"))) {
				attr_dev(li2, "class", li2_class_value);
			}

			if (!current || dirty & /*segment*/ 1 && li3_class_value !== (li3_class_value = "" + (null_to_empty(/*segment*/ ctx[0] === "experience" ? "selected" : "") + " svelte-118kcj1"))) {
				attr_dev(li3, "class", li3_class_value);
			}

			if (!current || dirty & /*showModal*/ 4 && li4_class_value !== (li4_class_value = "" + ((/*showModal*/ ctx[2] ? "selected" : "") + " open-modal" + " svelte-118kcj1"))) {
				attr_dev(li4, "class", li4_class_value);
			}

			if (!current || dirty & /*showModal*/ 4 && ul_class_value !== (ul_class_value = "navigation-list " + (/*showModal*/ ctx[2] ? "modal-active" : "") + " svelte-118kcj1")) {
				attr_dev(ul, "class", ul_class_value);
			}

			if (!current || dirty & /*reduceNavSize*/ 32 && nav_class_value !== (nav_class_value = "" + (null_to_empty(/*reduceNavSize*/ ctx[5]
			? "scrolled container"
			: "container") + " svelte-118kcj1"))) {
				attr_dev(nav, "class", nav_class_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(logo0.$$.fragment, local);
			transition_in(hamburger_1.$$.fragment, local);
			transition_in(logo1.$$.fragment, local);

			if (!li0_intro) {
				add_render_callback(() => {
					li0_intro = create_in_transition(li0, fly, { y: -15, duration: 500, delay: 200 });
					li0_intro.start();
				});
			}

			if (!li1_intro) {
				add_render_callback(() => {
					li1_intro = create_in_transition(li1, fly, { y: -15, duration: 500, delay: 300 });
					li1_intro.start();
				});
			}

			if (!li2_intro) {
				add_render_callback(() => {
					li2_intro = create_in_transition(li2, fly, { y: -15, duration: 500, delay: 400 });
					li2_intro.start();
				});
			}

			if (!li3_intro) {
				add_render_callback(() => {
					li3_intro = create_in_transition(li3, fly, { y: -15, duration: 500, delay: 500 });
					li3_intro.start();
				});
			}

			if (!li4_intro) {
				add_render_callback(() => {
					li4_intro = create_in_transition(li4, fly, { y: -15, duration: 500, delay: 600 });
					li4_intro.start();
				});
			}

			if (!header_intro) {
				add_render_callback(() => {
					header_intro = create_in_transition(header, fly, { y: -15, duration: 200, delay: 0 });
					header_intro.start();
				});
			}

			current = true;
		},
		o: function outro(local) {
			transition_out(logo0.$$.fragment, local);
			transition_out(hamburger_1.$$.fragment, local);
			transition_out(logo1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(header);
			destroy_component(logo0);
			/*hamburger_1_binding*/ ctx[13](null);
			destroy_component(hamburger_1);
			destroy_component(logo1);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$2.name,
		type: "if",
		source: "(382:0) {#if loadComponents}",
		ctx
	});

	return block;
}

function create_fragment$6(ctx) {
	let scrolling = false;

	let clear_scrolling = () => {
		scrolling = false;
	};

	let scrolling_timeout;
	let t;
	let contactmodal;
	let current;
	let mounted;
	let dispose;
	add_render_callback(/*onwindowscroll*/ ctx[11]);
	let if_block = /*loadComponents*/ ctx[1] && create_if_block$2(ctx);

	contactmodal = new ContactModal({
			props: { showModal: /*showModal*/ ctx[2] },
			$$inline: true
		});

	contactmodal.$on("click", /*click_handler_1*/ ctx[14]);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			t = space();
			create_component(contactmodal.$$.fragment);
		},
		l: function claim(nodes) {
			if (if_block) if_block.l(nodes);
			t = claim_space(nodes);
			claim_component(contactmodal.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, t, anchor);
			mount_component(contactmodal, target, anchor);
			current = true;

			if (!mounted) {
				dispose = listen_dev(window_1, "scroll", () => {
					scrolling = true;
					clearTimeout(scrolling_timeout);
					scrolling_timeout = setTimeout(clear_scrolling, 100);
					/*onwindowscroll*/ ctx[11]();
				});

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*windowY*/ 8 && !scrolling) {
				scrolling = true;
				clearTimeout(scrolling_timeout);
				scrollTo(window_1.pageXOffset, /*windowY*/ ctx[3]);
				scrolling_timeout = setTimeout(clear_scrolling, 100);
			}

			if (/*loadComponents*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*loadComponents*/ 2) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$2(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(t.parentNode, t);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			const contactmodal_changes = {};
			if (dirty & /*showModal*/ 4) contactmodal_changes.showModal = /*showModal*/ ctx[2];
			contactmodal.$set(contactmodal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			transition_in(contactmodal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			transition_out(contactmodal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(t);
			destroy_component(contactmodal, detaching);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$6.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function togglerOff() {
	if (window.innerWidth < 1023) {
		// toggle = true;
		document.getElementById("toggle").click();
	} // hamburger ? hamburger.$$.ctx.hamburger.click() : null;
}

function instance$6($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Navigation", slots, []);
	let { segment } = $$props, { loadComponents } = $$props;
	let showModal;
	let windowY;
	let hamburger;
	let toggle = false;
	let reduceNavSize = false;

	let activeNavigation = {
		home: false,
		about: false,
		experience: false
	};

	function navSize(y) {
		if (y > 75) {
			$$invalidate(5, reduceNavSize = true);
		} else {
			$$invalidate(5, reduceNavSize = false);
		}
	}

	function resetActiveNav() {
		let activeNavObj = Object.entries(activeNavigation);

		for (let [key, value] of activeNavObj) {
			$$invalidate(6, activeNavigation[key] = false, activeNavigation);
		}
	}

	// TODO -- these functions need to be cleaned up - not using all of this anymore (using segment prop instead)
	function setActiveNavOnClick() {
		let activeNavObj = Object.entries(activeNavigation);
		let elText = `${this.innerHTML.toLowerCase()}`;

		for (let [key, value] of activeNavObj) {
			if (key === elText) {
				$$invalidate(6, activeNavigation[key] = true, activeNavigation);
			} else {
				$$invalidate(6, activeNavigation[key] = false, activeNavigation);
			}
		}

		togglerOff();
	}

	function setActiveNav() {
		let path = window.location.pathname;
		if (path === "/") $$invalidate(6, activeNavigation.home = true, activeNavigation); else if (path === "/about") $$invalidate(6, activeNavigation.about = true, activeNavigation); else if (path === "/experience") $$invalidate(6, activeNavigation.experience = true, activeNavigation);
	}

	function openModal() {
		$$invalidate(2, showModal = true);
	}

	onMount(() => {
		setActiveNav();
	});

	const writable_props = ["segment", "loadComponents"];

	Object_1$1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Navigation> was created with unknown prop '${key}'`);
	});

	function onwindowscroll() {
		$$invalidate(3, windowY = window_1.pageYOffset);
	}

	const click_handler = () => {
		resetActiveNav();
		$$invalidate(6, activeNavigation.home = true, activeNavigation);
	};

	function hamburger_1_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			hamburger = $$value;
			$$invalidate(4, hamburger);
		});
	}

	const click_handler_1 = () => $$invalidate(2, showModal = false);

	$$self.$$set = $$props => {
		if ("segment" in $$props) $$invalidate(0, segment = $$props.segment);
		if ("loadComponents" in $$props) $$invalidate(1, loadComponents = $$props.loadComponents);
	};

	$$self.$capture_state = () => ({
		Hamburger,
		ContactModal,
		Logo,
		TextAnimation,
		onMount,
		draw,
		fade,
		blur,
		slide,
		scale,
		fly,
		quintOut,
		quartInOut,
		segment,
		loadComponents,
		showModal,
		windowY,
		hamburger,
		toggle,
		reduceNavSize,
		activeNavigation,
		navSize,
		togglerOff,
		resetActiveNav,
		setActiveNavOnClick,
		setActiveNav,
		openModal,
		headerClass
	});

	$$self.$inject_state = $$props => {
		if ("segment" in $$props) $$invalidate(0, segment = $$props.segment);
		if ("loadComponents" in $$props) $$invalidate(1, loadComponents = $$props.loadComponents);
		if ("showModal" in $$props) $$invalidate(2, showModal = $$props.showModal);
		if ("windowY" in $$props) $$invalidate(3, windowY = $$props.windowY);
		if ("hamburger" in $$props) $$invalidate(4, hamburger = $$props.hamburger);
		if ("toggle" in $$props) $$invalidate(7, toggle = $$props.toggle);
		if ("reduceNavSize" in $$props) $$invalidate(5, reduceNavSize = $$props.reduceNavSize);
		if ("activeNavigation" in $$props) $$invalidate(6, activeNavigation = $$props.activeNavigation);
		if ("headerClass" in $$props) headerClass = $$props.headerClass;
	};

	let headerClass;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*windowY*/ 8) {
			 headerClass = navSize(windowY);
		}
	};

	return [
		segment,
		loadComponents,
		showModal,
		windowY,
		hamburger,
		reduceNavSize,
		activeNavigation,
		toggle,
		resetActiveNav,
		setActiveNavOnClick,
		openModal,
		onwindowscroll,
		click_handler,
		hamburger_1_binding,
		click_handler_1
	];
}

class Navigation extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$6, create_fragment$6, safe_not_equal, { segment: 0, loadComponents: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Navigation",
			options,
			id: create_fragment$6.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*segment*/ ctx[0] === undefined && !("segment" in props)) {
			console.warn("<Navigation> was created without expected prop 'segment'");
		}

		if (/*loadComponents*/ ctx[1] === undefined && !("loadComponents" in props)) {
			console.warn("<Navigation> was created without expected prop 'loadComponents'");
		}
	}

	get segment() {
		throw new Error("<Navigation>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set segment(value) {
		throw new Error("<Navigation>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get loadComponents() {
		throw new Error("<Navigation>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set loadComponents(value) {
		throw new Error("<Navigation>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/global-components/Footer.svelte generated by Svelte v3.29.4 */
const file$7 = "src/components/global-components/Footer.svelte";

function create_fragment$7(ctx) {
	let footer;
	let div4;
	let div0;
	let p0;
	let t0;
	let a0;
	let t1;
	let t2;
	let a1;
	let t3;
	let t4;
	let a2;
	let t5;
	let t6;
	let div3;
	let div1;
	let p1;
	let t7;
	let t8;
	let a3;
	let textanimation0;
	let t9;
	let div2;
	let p2;
	let t10;
	let t11;
	let a4;
	let textanimation1;
	let t12;
	let div6;
	let p3;
	let t13;
	let t14_value = new Date().getFullYear() + "";
	let t14;
	let t15;
	let t16;
	let div5;
	let a5;
	let i0;
	let t17;
	let a6;
	let i1;
	let t18;
	let a7;
	let i2;
	let t19;
	let contactmodal;
	let current;
	let mounted;
	let dispose;

	textanimation0 = new TextAnimation({
			props: { text: `Joshua.micah.roper@gmail.com` },
			$$inline: true
		});

	textanimation1 = new TextAnimation({
			props: { text: `Download PDF` },
			$$inline: true
		});

	contactmodal = new ContactModal({
			props: { showModal: /*showModal*/ ctx[0] },
			$$inline: true
		});

	contactmodal.$on("click", /*click_handler*/ ctx[2]);

	const block = {
		c: function create() {
			footer = element("footer");
			div4 = element("div");
			div0 = element("div");
			p0 = element("p");
			t0 = text("Feel free to shoot me an ");
			a0 = element("a");
			t1 = text("email");
			t2 = text(" & connect through ");
			a1 = element("a");
			t3 = text("social.");
			t4 = space();
			a2 = element("a");
			t5 = text("Reach out!");
			t6 = space();
			div3 = element("div");
			div1 = element("div");
			p1 = element("p");
			t7 = text("Get In Touch!");
			t8 = space();
			a3 = element("a");
			create_component(textanimation0.$$.fragment);
			t9 = space();
			div2 = element("div");
			p2 = element("p");
			t10 = text("View Resume");
			t11 = space();
			a4 = element("a");
			create_component(textanimation1.$$.fragment);
			t12 = space();
			div6 = element("div");
			p3 = element("p");
			t13 = text("@ ");
			t14 = text(t14_value);
			t15 = text(" Joshua Roper Development");
			t16 = space();
			div5 = element("div");
			a5 = element("a");
			i0 = element("i");
			t17 = space();
			a6 = element("a");
			i1 = element("i");
			t18 = space();
			a7 = element("a");
			i2 = element("i");
			t19 = space();
			create_component(contactmodal.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			footer = claim_element(nodes, "FOOTER", { class: true });
			var footer_nodes = children(footer);
			div4 = claim_element(footer_nodes, "DIV", { class: true });
			var div4_nodes = children(div4);
			div0 = claim_element(div4_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			p0 = claim_element(div0_nodes, "P", { class: true });
			var p0_nodes = children(p0);
			t0 = claim_text(p0_nodes, "Feel free to shoot me an ");
			a0 = claim_element(p0_nodes, "A", { href: true, class: true });
			var a0_nodes = children(a0);
			t1 = claim_text(a0_nodes, "email");
			a0_nodes.forEach(detach_dev);
			t2 = claim_text(p0_nodes, " & connect through ");
			a1 = claim_element(p0_nodes, "A", { href: true, target: true, class: true });
			var a1_nodes = children(a1);
			t3 = claim_text(a1_nodes, "social.");
			a1_nodes.forEach(detach_dev);
			p0_nodes.forEach(detach_dev);
			t4 = claim_space(div0_nodes);
			a2 = claim_element(div0_nodes, "A", { class: true, href: true });
			var a2_nodes = children(a2);
			t5 = claim_text(a2_nodes, "Reach out!");
			a2_nodes.forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			t6 = claim_space(div4_nodes);
			div3 = claim_element(div4_nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			div1 = claim_element(div3_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			p1 = claim_element(div1_nodes, "P", { class: true });
			var p1_nodes = children(p1);
			t7 = claim_text(p1_nodes, "Get In Touch!");
			p1_nodes.forEach(detach_dev);
			t8 = claim_space(div1_nodes);
			a3 = claim_element(div1_nodes, "A", { href: true, class: true });
			var a3_nodes = children(a3);
			claim_component(textanimation0.$$.fragment, a3_nodes);
			a3_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			t9 = claim_space(div3_nodes);
			div2 = claim_element(div3_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			p2 = claim_element(div2_nodes, "P", { class: true });
			var p2_nodes = children(p2);
			t10 = claim_text(p2_nodes, "View Resume");
			p2_nodes.forEach(detach_dev);
			t11 = claim_space(div2_nodes);
			a4 = claim_element(div2_nodes, "A", { href: true, download: true, class: true });
			var a4_nodes = children(a4);
			claim_component(textanimation1.$$.fragment, a4_nodes);
			a4_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			div3_nodes.forEach(detach_dev);
			div4_nodes.forEach(detach_dev);
			t12 = claim_space(footer_nodes);
			div6 = claim_element(footer_nodes, "DIV", { class: true });
			var div6_nodes = children(div6);
			p3 = claim_element(div6_nodes, "P", { class: true });
			var p3_nodes = children(p3);
			t13 = claim_text(p3_nodes, "@ ");
			t14 = claim_text(p3_nodes, t14_value);
			t15 = claim_text(p3_nodes, " Joshua Roper Development");
			p3_nodes.forEach(detach_dev);
			t16 = claim_space(div6_nodes);
			div5 = claim_element(div6_nodes, "DIV", { class: true });
			var div5_nodes = children(div5);

			a5 = claim_element(div5_nodes, "A", {
				href: true,
				"aria-label": true,
				target: true,
				rel: true,
				class: true
			});

			var a5_nodes = children(a5);
			i0 = claim_element(a5_nodes, "I", { class: true });
			children(i0).forEach(detach_dev);
			a5_nodes.forEach(detach_dev);
			t17 = claim_space(div5_nodes);

			a6 = claim_element(div5_nodes, "A", {
				href: true,
				"aria-label": true,
				target: true,
				rel: true,
				class: true
			});

			var a6_nodes = children(a6);
			i1 = claim_element(a6_nodes, "I", { class: true });
			children(i1).forEach(detach_dev);
			a6_nodes.forEach(detach_dev);
			t18 = claim_space(div5_nodes);

			a7 = claim_element(div5_nodes, "A", {
				href: true,
				"aria-label": true,
				class: true
			});

			var a7_nodes = children(a7);
			i2 = claim_element(a7_nodes, "I", { class: true });
			children(i2).forEach(detach_dev);
			a7_nodes.forEach(detach_dev);
			div5_nodes.forEach(detach_dev);
			div6_nodes.forEach(detach_dev);
			footer_nodes.forEach(detach_dev);
			t19 = claim_space(nodes);
			claim_component(contactmodal.$$.fragment, nodes);
			this.h();
		},
		h: function hydrate() {
			attr_dev(a0, "href", "mailto:joshua.micah.roper@gmail.com");
			attr_dev(a0, "class", "svelte-1493n1x");
			add_location(a0, file$7, 212, 41, 4910);
			attr_dev(a1, "href", "https://www.linkedin.com/in/jr-dev");
			attr_dev(a1, "target", "blank");
			attr_dev(a1, "class", "svelte-1493n1x");
			add_location(a1, file$7, 212, 115, 4984);
			attr_dev(p0, "class", "headline svelte-1493n1x");
			add_location(p0, file$7, 211, 12, 4848);
			attr_dev(a2, "class", "open-modal svelte-1493n1x");
			attr_dev(a2, "href", "javascript:void(0)");
			add_location(a2, file$7, 214, 12, 5085);
			attr_dev(div0, "class", "left svelte-1493n1x");
			add_location(div0, file$7, 210, 8, 4817);
			attr_dev(p1, "class", "title svelte-1493n1x");
			add_location(p1, file$7, 218, 16, 5263);
			attr_dev(a3, "href", "mailto:joshua.micah.roper@gmail.com");
			attr_dev(a3, "class", "svelte-1493n1x");
			add_location(a3, file$7, 221, 16, 5352);
			attr_dev(div1, "class", "text-cta svelte-1493n1x");
			add_location(div1, file$7, 217, 12, 5224);
			attr_dev(p2, "class", "title svelte-1493n1x");
			add_location(p2, file$7, 226, 16, 5566);
			attr_dev(a4, "href", "./pdfs/resume-joshua-roper.pdf");
			attr_dev(a4, "download", "");
			attr_dev(a4, "class", "svelte-1493n1x");
			add_location(a4, file$7, 229, 16, 5653);
			attr_dev(div2, "class", "text-cta svelte-1493n1x");
			add_location(div2, file$7, 225, 12, 5527);
			attr_dev(div3, "class", "right svelte-1493n1x");
			add_location(div3, file$7, 216, 8, 5192);
			attr_dev(div4, "class", "container footer-container svelte-1493n1x");
			add_location(div4, file$7, 209, 4, 4768);
			attr_dev(p3, "class", "copyright svelte-1493n1x");
			add_location(p3, file$7, 237, 8, 5886);
			attr_dev(i0, "class", "fab fa-github svelte-1493n1x");
			add_location(i0, file$7, 240, 16, 6153);
			attr_dev(a5, "href", "https://www.github.com/Jrope21");
			attr_dev(a5, "aria-label", "link to Joshua Roper's GitHub account");
			attr_dev(a5, "target", "_blank");
			attr_dev(a5, "rel", "noopener");
			attr_dev(a5, "class", "svelte-1493n1x");
			add_location(a5, file$7, 239, 12, 6012);
			attr_dev(i1, "class", "fab fa-linkedin svelte-1493n1x");
			add_location(i1, file$7, 243, 16, 6359);
			attr_dev(a6, "href", "https://www.linkedin.com/in/JR-dev");
			attr_dev(a6, "aria-label", "link to Joshua Roper's LinkedIn account");
			attr_dev(a6, "target", "_blank");
			attr_dev(a6, "rel", "noopener");
			attr_dev(a6, "class", "svelte-1493n1x");
			add_location(a6, file$7, 242, 12, 6212);
			attr_dev(i2, "class", "fas fa-envelope svelte-1493n1x");
			add_location(i2, file$7, 246, 16, 6532);
			attr_dev(a7, "href", "mailto:joshua.micah.roper@gmail.com");
			attr_dev(a7, "aria-label", "link to send Joshua Roper an email");
			attr_dev(a7, "class", "svelte-1493n1x");
			add_location(a7, file$7, 245, 12, 6420);
			attr_dev(div5, "class", "social-icons svelte-1493n1x");
			add_location(div5, file$7, 238, 8, 5973);
			attr_dev(div6, "class", "bottom-row container svelte-1493n1x");
			add_location(div6, file$7, 235, 4, 5834);
			attr_dev(footer, "class", "svelte-1493n1x");
			add_location(footer, file$7, 208, 0, 4755);
		},
		m: function mount(target, anchor) {
			insert_dev(target, footer, anchor);
			append_dev(footer, div4);
			append_dev(div4, div0);
			append_dev(div0, p0);
			append_dev(p0, t0);
			append_dev(p0, a0);
			append_dev(a0, t1);
			append_dev(p0, t2);
			append_dev(p0, a1);
			append_dev(a1, t3);
			append_dev(div0, t4);
			append_dev(div0, a2);
			append_dev(a2, t5);
			append_dev(div4, t6);
			append_dev(div4, div3);
			append_dev(div3, div1);
			append_dev(div1, p1);
			append_dev(p1, t7);
			append_dev(div1, t8);
			append_dev(div1, a3);
			mount_component(textanimation0, a3, null);
			append_dev(div3, t9);
			append_dev(div3, div2);
			append_dev(div2, p2);
			append_dev(p2, t10);
			append_dev(div2, t11);
			append_dev(div2, a4);
			mount_component(textanimation1, a4, null);
			append_dev(footer, t12);
			append_dev(footer, div6);
			append_dev(div6, p3);
			append_dev(p3, t13);
			append_dev(p3, t14);
			append_dev(p3, t15);
			append_dev(div6, t16);
			append_dev(div6, div5);
			append_dev(div5, a5);
			append_dev(a5, i0);
			append_dev(div5, t17);
			append_dev(div5, a6);
			append_dev(a6, i1);
			append_dev(div5, t18);
			append_dev(div5, a7);
			append_dev(a7, i2);
			insert_dev(target, t19, anchor);
			mount_component(contactmodal, target, anchor);
			current = true;

			if (!mounted) {
				dispose = listen_dev(a2, "click", /*openModal*/ ctx[1], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			const contactmodal_changes = {};
			if (dirty & /*showModal*/ 1) contactmodal_changes.showModal = /*showModal*/ ctx[0];
			contactmodal.$set(contactmodal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(textanimation0.$$.fragment, local);
			transition_in(textanimation1.$$.fragment, local);
			transition_in(contactmodal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(textanimation0.$$.fragment, local);
			transition_out(textanimation1.$$.fragment, local);
			transition_out(contactmodal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(footer);
			destroy_component(textanimation0);
			destroy_component(textanimation1);
			if (detaching) detach_dev(t19);
			destroy_component(contactmodal, detaching);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$7.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$7($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Footer", slots, []);
	let showModal;

	function openModal() {
		$$invalidate(0, showModal = true);
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Footer> was created with unknown prop '${key}'`);
	});

	const click_handler = () => $$invalidate(0, showModal = false);

	$$self.$capture_state = () => ({
		ContactModal,
		TextAnimation,
		showModal,
		openModal
	});

	$$self.$inject_state = $$props => {
		if ("showModal" in $$props) $$invalidate(0, showModal = $$props.showModal);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [showModal, openModal, click_handler];
}

class Footer extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Footer",
			options,
			id: create_fragment$7.name
		});
	}
}

/* src/components/global-components/FirstLoadPageAnimation.svelte generated by Svelte v3.29.4 */
const file$8 = "src/components/global-components/FirstLoadPageAnimation.svelte";

// (46:4) {#if visible}
function create_if_block_1$2(ctx) {
	let style;
	let t;

	const block = {
		c: function create() {
			style = element("style");
			t = text("body {\n    overflow: hidden;\n}");
			this.h();
		},
		l: function claim(nodes) {
			style = claim_element(nodes, "STYLE", {});
			var style_nodes = children(style);
			t = claim_text(style_nodes, "body {\n    overflow: hidden;\n}");
			style_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(style, file$8, 46, 8, 852);
		},
		m: function mount(target, anchor) {
			insert_dev(target, style, anchor);
			append_dev(style, t);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(style);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$2.name,
		type: "if",
		source: "(46:4) {#if visible}",
		ctx
	});

	return block;
}

// (55:0) {#if visible}
function create_if_block$3(ctx) {
	let section;
	let span;
	let t;
	let logo;
	let section_outro;
	let current;

	logo = new Logo({
			props: { enableFullAnimation: true },
			$$inline: true
		});

	const block = {
		c: function create() {
			section = element("section");
			span = element("span");
			t = space();
			create_component(logo.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			section = claim_element(nodes, "SECTION", { class: true });
			var section_nodes = children(section);
			span = claim_element(section_nodes, "SPAN", { class: true });
			children(span).forEach(detach_dev);
			t = claim_space(section_nodes);
			claim_component(logo.$$.fragment, section_nodes);
			section_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", "background svelte-bqgwcu");
			add_location(span, file$8, 56, 8, 1031);
			attr_dev(section, "class", "svelte-bqgwcu");
			add_location(section, file$8, 55, 4, 952);
		},
		m: function mount(target, anchor) {
			insert_dev(target, section, anchor);
			append_dev(section, span);
			append_dev(section, t);
			mount_component(logo, section, null);
			current = true;
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
		},
		i: function intro(local) {
			if (current) return;
			transition_in(logo.$$.fragment, local);
			if (section_outro) section_outro.end(1);
			current = true;
		},
		o: function outro(local) {
			transition_out(logo.$$.fragment, local);

			section_outro = create_out_transition(section, fade, {
				duration: 500,
				delay: 250,
				easing: quartInOut
			});

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(section);
			destroy_component(logo);
			if (detaching && section_outro) section_outro.end();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$3.name,
		type: "if",
		source: "(55:0) {#if visible}",
		ctx
	});

	return block;
}

function create_fragment$8(ctx) {
	let t0;
	let if_block0_anchor;
	let t1;
	let if_block1_anchor;
	let current;
	let if_block0 = /*visible*/ ctx[0] && create_if_block_1$2(ctx);
	let if_block1 = /*visible*/ ctx[0] && create_if_block$3(ctx);

	const block = {
		c: function create() {
			t0 = space();
			if (if_block0) if_block0.c();
			if_block0_anchor = empty();
			t1 = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
		},
		l: function claim(nodes) {
			t0 = claim_space(nodes);
			const head_nodes = query_selector_all("[data-svelte=\"svelte-1xevnf0\"]", document.head);
			if (if_block0) if_block0.l(head_nodes);
			if_block0_anchor = empty();
			head_nodes.forEach(detach_dev);
			t1 = claim_space(nodes);
			if (if_block1) if_block1.l(nodes);
			if_block1_anchor = empty();
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			if (if_block0) if_block0.m(document.head, null);
			append_dev(document.head, if_block0_anchor);
			insert_dev(target, t1, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, if_block1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*visible*/ ctx[0]) {
				if (if_block0) ; else {
					if_block0 = create_if_block_1$2(ctx);
					if_block0.c();
					if_block0.m(if_block0_anchor.parentNode, if_block0_anchor);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*visible*/ ctx[0]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*visible*/ 1) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block$3(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (if_block0) if_block0.d(detaching);
			detach_dev(if_block0_anchor);
			if (detaching) detach_dev(t1);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(if_block1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$8.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$8($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("FirstLoadPageAnimation", slots, []);
	let visible = true;

	onMount(() => {
		setTimeout(
			() => {
				$$invalidate(0, visible = false);
			},
			3750
		);
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<FirstLoadPageAnimation> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({
		Logo,
		onMount,
		draw,
		fade,
		blur,
		slide,
		scale,
		quintOut,
		quartInOut,
		visible
	});

	$$self.$inject_state = $$props => {
		if ("visible" in $$props) $$invalidate(0, visible = $$props.visible);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [visible];
}

class FirstLoadPageAnimation extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "FirstLoadPageAnimation",
			options,
			id: create_fragment$8.name
		});
	}
}

/* src/routes/_layout.svelte generated by Svelte v3.29.4 */
const file$9 = "src/routes/_layout.svelte";

// (662:1) {#if finishedLoadPage}
function create_if_block$4(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		l: function claim(nodes) {
			if (default_slot) default_slot.l(nodes);
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 4) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[2], dirty, null, null);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$4.name,
		type: "if",
		source: "(662:1) {#if finishedLoadPage}",
		ctx
	});

	return block;
}

function create_fragment$9(ctx) {
	let navigation;
	let t0;
	let div;
	let t1;
	let firstloadpageanimation;
	let t2;
	let main;
	let t3;
	let footer;
	let current;

	navigation = new Navigation({
			props: {
				segment: /*segment*/ ctx[0],
				loadComponents: /*finishedLoadPage*/ ctx[1]
			},
			$$inline: true
		});

	firstloadpageanimation = new FirstLoadPageAnimation({ $$inline: true });
	let if_block = /*finishedLoadPage*/ ctx[1] && create_if_block$4(ctx);
	footer = new Footer({ $$inline: true });

	const block = {
		c: function create() {
			create_component(navigation.$$.fragment);
			t0 = space();
			div = element("div");
			t1 = space();
			create_component(firstloadpageanimation.$$.fragment);
			t2 = space();
			main = element("main");
			if (if_block) if_block.c();
			t3 = space();
			create_component(footer.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			claim_component(navigation.$$.fragment, nodes);
			t0 = claim_space(nodes);
			div = claim_element(nodes, "DIV", { class: true });
			children(div).forEach(detach_dev);
			t1 = claim_space(nodes);
			claim_component(firstloadpageanimation.$$.fragment, nodes);
			t2 = claim_space(nodes);
			main = claim_element(nodes, "MAIN", {});
			var main_nodes = children(main);
			if (if_block) if_block.l(main_nodes);
			main_nodes.forEach(detach_dev);
			t3 = claim_space(nodes);
			claim_component(footer.$$.fragment, nodes);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "background");
			add_location(div, file$9, 658, 0, 15540);
			add_location(main, file$9, 660, 0, 15598);
		},
		m: function mount(target, anchor) {
			mount_component(navigation, target, anchor);
			insert_dev(target, t0, anchor);
			insert_dev(target, div, anchor);
			insert_dev(target, t1, anchor);
			mount_component(firstloadpageanimation, target, anchor);
			insert_dev(target, t2, anchor);
			insert_dev(target, main, anchor);
			if (if_block) if_block.m(main, null);
			insert_dev(target, t3, anchor);
			mount_component(footer, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const navigation_changes = {};
			if (dirty & /*segment*/ 1) navigation_changes.segment = /*segment*/ ctx[0];
			if (dirty & /*finishedLoadPage*/ 2) navigation_changes.loadComponents = /*finishedLoadPage*/ ctx[1];
			navigation.$set(navigation_changes);

			if (/*finishedLoadPage*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*finishedLoadPage*/ 2) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$4(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(main, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(navigation.$$.fragment, local);
			transition_in(firstloadpageanimation.$$.fragment, local);
			transition_in(if_block);
			transition_in(footer.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(navigation.$$.fragment, local);
			transition_out(firstloadpageanimation.$$.fragment, local);
			transition_out(if_block);
			transition_out(footer.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(navigation, detaching);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div);
			if (detaching) detach_dev(t1);
			destroy_component(firstloadpageanimation, detaching);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(main);
			if (if_block) if_block.d();
			if (detaching) detach_dev(t3);
			destroy_component(footer, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$9.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$9($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Layout", slots, ['default']);
	let { segment } = $$props;
	let visible = false;
	let finishedLoadPage = false;

	onMount(() => {
		visible = true;

		setTimeout(
			() => {
				$$invalidate(1, finishedLoadPage = true);
			},
			4000
		);
	});

	const writable_props = ["segment"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Layout> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("segment" in $$props) $$invalidate(0, segment = $$props.segment);
		if ("$$scope" in $$props) $$invalidate(2, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		stores: stores$1,
		onMount,
		fade,
		fly,
		Navigation,
		Footer,
		FirstLoadPageAnimation,
		segment,
		visible,
		finishedLoadPage
	});

	$$self.$inject_state = $$props => {
		if ("segment" in $$props) $$invalidate(0, segment = $$props.segment);
		if ("visible" in $$props) visible = $$props.visible;
		if ("finishedLoadPage" in $$props) $$invalidate(1, finishedLoadPage = $$props.finishedLoadPage);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [segment, finishedLoadPage, $$scope, slots];
}

class Layout extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$9, create_fragment$9, safe_not_equal, { segment: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Layout",
			options,
			id: create_fragment$9.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*segment*/ ctx[0] === undefined && !("segment" in props)) {
			console.warn("<Layout> was created without expected prop 'segment'");
		}
	}

	get segment() {
		throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set segment(value) {
		throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/routes/_error.svelte generated by Svelte v3.29.4 */

const { Error: Error_1 } = globals;
const file$a = "src/routes/_error.svelte";

// (38:0) {#if dev && error.stack}
function create_if_block$5(ctx) {
	let pre;
	let t_value = /*error*/ ctx[1].stack + "";
	let t;

	const block = {
		c: function create() {
			pre = element("pre");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			pre = claim_element(nodes, "PRE", {});
			var pre_nodes = children(pre);
			t = claim_text(pre_nodes, t_value);
			pre_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(pre, file$a, 38, 1, 427);
		},
		m: function mount(target, anchor) {
			insert_dev(target, pre, anchor);
			append_dev(pre, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*error*/ 2 && t_value !== (t_value = /*error*/ ctx[1].stack + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(pre);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$5.name,
		type: "if",
		source: "(38:0) {#if dev && error.stack}",
		ctx
	});

	return block;
}

function create_fragment$a(ctx) {
	let title_value;
	let t0;
	let h1;
	let t1;
	let t2;
	let p;
	let t3_value = /*error*/ ctx[1].message + "";
	let t3;
	let t4;
	let if_block_anchor;
	document.title = title_value = /*status*/ ctx[0];
	let if_block = /*dev*/ ctx[2] && /*error*/ ctx[1].stack && create_if_block$5(ctx);

	const block = {
		c: function create() {
			t0 = space();
			h1 = element("h1");
			t1 = text(/*status*/ ctx[0]);
			t2 = space();
			p = element("p");
			t3 = text(t3_value);
			t4 = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-1o9r2ue\"]", document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			h1 = claim_element(nodes, "H1", { class: true });
			var h1_nodes = children(h1);
			t1 = claim_text(h1_nodes, /*status*/ ctx[0]);
			h1_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			p = claim_element(nodes, "P", { class: true });
			var p_nodes = children(p);
			t3 = claim_text(p_nodes, t3_value);
			p_nodes.forEach(detach_dev);
			t4 = claim_space(nodes);
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
			this.h();
		},
		h: function hydrate() {
			attr_dev(h1, "class", "svelte-u4e356");
			add_location(h1, file$a, 33, 0, 358);
			attr_dev(p, "class", "svelte-u4e356");
			add_location(p, file$a, 35, 0, 377);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, h1, anchor);
			append_dev(h1, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, p, anchor);
			append_dev(p, t3);
			insert_dev(target, t4, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*status*/ 1 && title_value !== (title_value = /*status*/ ctx[0])) {
				document.title = title_value;
			}

			if (dirty & /*status*/ 1) set_data_dev(t1, /*status*/ ctx[0]);
			if (dirty & /*error*/ 2 && t3_value !== (t3_value = /*error*/ ctx[1].message + "")) set_data_dev(t3, t3_value);

			if (/*dev*/ ctx[2] && /*error*/ ctx[1].stack) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$5(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(h1);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(p);
			if (detaching) detach_dev(t4);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$a.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$a($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Error", slots, []);
	let { status } = $$props;
	let { error } = $$props;
	const dev = "development" === "development";
	const writable_props = ["status", "error"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Error> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("status" in $$props) $$invalidate(0, status = $$props.status);
		if ("error" in $$props) $$invalidate(1, error = $$props.error);
	};

	$$self.$capture_state = () => ({ status, error, dev });

	$$self.$inject_state = $$props => {
		if ("status" in $$props) $$invalidate(0, status = $$props.status);
		if ("error" in $$props) $$invalidate(1, error = $$props.error);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [status, error, dev];
}

class Error$1 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$a, create_fragment$a, safe_not_equal, { status: 0, error: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Error",
			options,
			id: create_fragment$a.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*status*/ ctx[0] === undefined && !("status" in props)) {
			console.warn("<Error> was created without expected prop 'status'");
		}

		if (/*error*/ ctx[1] === undefined && !("error" in props)) {
			console.warn("<Error> was created without expected prop 'error'");
		}
	}

	get status() {
		throw new Error_1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set status(value) {
		throw new Error_1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get error() {
		throw new Error_1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set error(value) {
		throw new Error_1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/node_modules/@sapper/internal/App.svelte generated by Svelte v3.29.4 */

const { Error: Error_1$1 } = globals;

// (23:1) {:else}
function create_else_block(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [/*level1*/ ctx[4].props];
	var switch_value = /*level1*/ ctx[4].component;

	function switch_props(ctx) {
		let switch_instance_props = {};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		l: function claim(nodes) {
			if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty & /*level1*/ 16)
			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*level1*/ ctx[4].props)])
			: {};

			if (switch_value !== (switch_value = /*level1*/ ctx[4].component)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(23:1) {:else}",
		ctx
	});

	return block;
}

// (21:1) {#if error}
function create_if_block$6(ctx) {
	let error_1;
	let current;

	error_1 = new Error$1({
			props: {
				error: /*error*/ ctx[0],
				status: /*status*/ ctx[1]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(error_1.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(error_1.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(error_1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const error_1_changes = {};
			if (dirty & /*error*/ 1) error_1_changes.error = /*error*/ ctx[0];
			if (dirty & /*status*/ 2) error_1_changes.status = /*status*/ ctx[1];
			error_1.$set(error_1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(error_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(error_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(error_1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$6.name,
		type: "if",
		source: "(21:1) {#if error}",
		ctx
	});

	return block;
}

// (20:0) <Layout segment="{segments[0]}" {...level0.props}>
function create_default_slot$1(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$6, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*error*/ ctx[0]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$1.name,
		type: "slot",
		source: "(20:0) <Layout segment=\\\"{segments[0]}\\\" {...level0.props}>",
		ctx
	});

	return block;
}

function create_fragment$b(ctx) {
	let layout;
	let current;
	const layout_spread_levels = [{ segment: /*segments*/ ctx[2][0] }, /*level0*/ ctx[3].props];

	let layout_props = {
		$$slots: { default: [create_default_slot$1] },
		$$scope: { ctx }
	};

	for (let i = 0; i < layout_spread_levels.length; i += 1) {
		layout_props = assign(layout_props, layout_spread_levels[i]);
	}

	layout = new Layout({ props: layout_props, $$inline: true });

	const block = {
		c: function create() {
			create_component(layout.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(layout.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(layout, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const layout_changes = (dirty & /*segments, level0*/ 12)
			? get_spread_update(layout_spread_levels, [
					dirty & /*segments*/ 4 && { segment: /*segments*/ ctx[2][0] },
					dirty & /*level0*/ 8 && get_spread_object(/*level0*/ ctx[3].props)
				])
			: {};

			if (dirty & /*$$scope, error, status, level1*/ 147) {
				layout_changes.$$scope = { dirty, ctx };
			}

			layout.$set(layout_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(layout.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(layout.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(layout, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$b.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$b($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("App", slots, []);
	let { stores } = $$props;
	let { error } = $$props;
	let { status } = $$props;
	let { segments } = $$props;
	let { level0 } = $$props;
	let { level1 = null } = $$props;
	let { notify } = $$props;
	afterUpdate(notify);
	setContext(CONTEXT_KEY, stores);
	const writable_props = ["stores", "error", "status", "segments", "level0", "level1", "notify"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
		if ("error" in $$props) $$invalidate(0, error = $$props.error);
		if ("status" in $$props) $$invalidate(1, status = $$props.status);
		if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
		if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
		if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
		if ("notify" in $$props) $$invalidate(6, notify = $$props.notify);
	};

	$$self.$capture_state = () => ({
		setContext,
		afterUpdate,
		CONTEXT_KEY,
		Layout,
		Error: Error$1,
		stores,
		error,
		status,
		segments,
		level0,
		level1,
		notify
	});

	$$self.$inject_state = $$props => {
		if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
		if ("error" in $$props) $$invalidate(0, error = $$props.error);
		if ("status" in $$props) $$invalidate(1, status = $$props.status);
		if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
		if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
		if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
		if ("notify" in $$props) $$invalidate(6, notify = $$props.notify);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [error, status, segments, level0, level1, stores, notify];
}

class App extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$b, create_fragment$b, safe_not_equal, {
			stores: 5,
			error: 0,
			status: 1,
			segments: 2,
			level0: 3,
			level1: 4,
			notify: 6
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "App",
			options,
			id: create_fragment$b.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*stores*/ ctx[5] === undefined && !("stores" in props)) {
			console.warn("<App> was created without expected prop 'stores'");
		}

		if (/*error*/ ctx[0] === undefined && !("error" in props)) {
			console.warn("<App> was created without expected prop 'error'");
		}

		if (/*status*/ ctx[1] === undefined && !("status" in props)) {
			console.warn("<App> was created without expected prop 'status'");
		}

		if (/*segments*/ ctx[2] === undefined && !("segments" in props)) {
			console.warn("<App> was created without expected prop 'segments'");
		}

		if (/*level0*/ ctx[3] === undefined && !("level0" in props)) {
			console.warn("<App> was created without expected prop 'level0'");
		}

		if (/*notify*/ ctx[6] === undefined && !("notify" in props)) {
			console.warn("<App> was created without expected prop 'notify'");
		}
	}

	get stores() {
		throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set stores(value) {
		throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get error() {
		throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set error(value) {
		throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get status() {
		throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set status(value) {
		throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get segments() {
		throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set segments(value) {
		throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get level0() {
		throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set level0(value) {
		throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get level1() {
		throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set level1(value) {
		throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get notify() {
		throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set notify(value) {
		throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

// This file is generated by Sapper — do not edit it!

const ignore = [];

const components = [
	{
		js: () => import('./index.9709fe49.js'),
		css: ["index.9709fe49.css","client.c244b537.css","Projects.c0b82e40.css"]
	},
	{
		js: () => import('./experience.f0f512d3.js'),
		css: ["experience.f0f512d3.css","client.c244b537.css"]
	},
	{
		js: () => import('./creative-revolt.176789be.js'),
		css: ["client.c244b537.css","PageTitle.214c64de.css","ProjectDetailTemplate.87ea0395.css"]
	},
	{
		js: () => import('./university-park.3813b2e7.js'),
		css: ["client.c244b537.css","PageTitle.214c64de.css","ProjectDetailTemplate.87ea0395.css"]
	},
	{
		js: () => import('./di-repairs.bcc09314.js'),
		css: ["client.c244b537.css","PageTitle.214c64de.css","ProjectDetailTemplate.87ea0395.css"]
	},
	{
		js: () => import('./stallion.0b40f759.js'),
		css: ["client.c244b537.css","PageTitle.214c64de.css","ProjectDetailTemplate.87ea0395.css"]
	},
	{
		js: () => import('./halcyon.75fdd4c0.js'),
		css: ["client.c244b537.css","PageTitle.214c64de.css","ProjectDetailTemplate.87ea0395.css"]
	},
	{
		js: () => import('./projects.5fd91961.js'),
		css: ["projects.5fd91961.css","client.c244b537.css","Projects.c0b82e40.css","PageTitle.214c64de.css"]
	},
	{
		js: () => import('./about.df307af1.js'),
		css: ["about.df307af1.css","client.c244b537.css"]
	}
];

const routes = [
	{
		// index.svelte
		pattern: /^\/$/,
		parts: [
			{ i: 0 }
		]
	},

	{
		// experience.svelte
		pattern: /^\/experience\/?$/,
		parts: [
			{ i: 1 }
		]
	},

	{
		// projects/creative-revolt.svelte
		pattern: /^\/projects\/creative-revolt\/?$/,
		parts: [
			null,
			{ i: 2 }
		]
	},

	{
		// projects/university-park.svelte
		pattern: /^\/projects\/university-park\/?$/,
		parts: [
			null,
			{ i: 3 }
		]
	},

	{
		// projects/di-repairs.svelte
		pattern: /^\/projects\/di-repairs\/?$/,
		parts: [
			null,
			{ i: 4 }
		]
	},

	{
		// projects/stallion.svelte
		pattern: /^\/projects\/stallion\/?$/,
		parts: [
			null,
			{ i: 5 }
		]
	},

	{
		// projects/halcyon.svelte
		pattern: /^\/projects\/halcyon\/?$/,
		parts: [
			null,
			{ i: 6 }
		]
	},

	{
		// projects.svelte
		pattern: /^\/projects\/?$/,
		parts: [
			{ i: 7 }
		]
	},

	{
		// about.svelte
		pattern: /^\/about\/?$/,
		parts: [
			{ i: 8 }
		]
	}
];

if (typeof window !== 'undefined') {
	import('./sapper-dev-client.1e7a4a5e.js').then(client => {
		client.connect(10000);
	});
}

function goto(href, opts = { replaceState: false }) {
	const target = select_target(new URL(href, document.baseURI));

	if (target) {
		_history[opts.replaceState ? 'replaceState' : 'pushState']({ id: cid }, '', href);
		return navigate(target, null).then(() => {});
	}

	location.href = href;
	return new Promise(f => {}); // never resolves
}

/** Callback to inform of a value updates. */



















function page_store(value) {
	const store = writable(value);
	let ready = true;

	function notify() {
		ready = true;
		store.update(val => val);
	}

	function set(new_value) {
		ready = false;
		store.set(new_value);
	}

	function subscribe(run) {
		let old_value;
		return store.subscribe((value) => {
			if (old_value === undefined || (ready && value !== old_value)) {
				run(old_value = value);
			}
		});
	}

	return { notify, set, subscribe };
}

const initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;

let ready = false;
let root_component;
let current_token;
let root_preloaded;
let current_branch = [];
let current_query = '{}';

const stores = {
	page: page_store({}),
	preloading: writable(null),
	session: writable(initial_data && initial_data.session)
};

let $session;
let session_dirty;

stores.session.subscribe(async value => {
	$session = value;

	if (!ready) return;
	session_dirty = true;

	const target = select_target(new URL(location.href));

	const token = current_token = {};
	const { redirect, props, branch } = await hydrate_target(target);
	if (token !== current_token) return; // a secondary navigation happened while we were loading

	await render(redirect, branch, props, target.page);
});

let prefetching


 = null;
function set_prefetching(href, promise) {
	prefetching = { href, promise };
}

let target;
function set_target(element) {
	target = element;
}

let uid = 1;
function set_uid(n) {
	uid = n;
}

let cid;
function set_cid(n) {
	cid = n;
}

const _history = typeof history !== 'undefined' ? history : {
	pushState: (state, title, href) => {},
	replaceState: (state, title, href) => {},
	scrollRestoration: ''
};

const scroll_history = {};

function extract_query(search) {
	const query = Object.create(null);
	if (search.length > 0) {
		search.slice(1).split('&').forEach(searchParam => {
			let [, key, value = ''] = /([^=]*)(?:=(.*))?/.exec(decodeURIComponent(searchParam.replace(/\+/g, ' ')));
			if (typeof query[key] === 'string') query[key] = [query[key]];
			if (typeof query[key] === 'object') (query[key] ).push(value);
			else query[key] = value;
		});
	}
	return query;
}

function select_target(url) {
	if (url.origin !== location.origin) return null;
	if (!url.pathname.startsWith(initial_data.baseUrl)) return null;

	let path = url.pathname.slice(initial_data.baseUrl.length);

	if (path === '') {
		path = '/';
	}

	// avoid accidental clashes between server routes and page routes
	if (ignore.some(pattern => pattern.test(path))) return;

	for (let i = 0; i < routes.length; i += 1) {
		const route = routes[i];

		const match = route.pattern.exec(path);

		if (match) {
			const query = extract_query(url.search);
			const part = route.parts[route.parts.length - 1];
			const params = part.params ? part.params(match) : {};

			const page = { host: location.host, path, query, params };

			return { href: url.href, route, match, page };
		}
	}
}

function handle_error(url) {
	const { host, pathname, search } = location;
	const { session, preloaded, status, error } = initial_data;

	if (!root_preloaded) {
		root_preloaded = preloaded && preloaded[0];
	}

	const props = {
		error,
		status,
		session,
		level0: {
			props: root_preloaded
		},
		level1: {
			props: {
				status,
				error
			},
			component: Error$1
		},
		segments: preloaded

	};
	const query = extract_query(search);
	render(null, [], props, { host, path: pathname, query, params: {} });
}

function scroll_state() {
	return {
		x: pageXOffset,
		y: pageYOffset
	};
}

async function navigate(target, id, noscroll, hash) {
	if (id) {
		// popstate or initial navigation
		cid = id;
	} else {
		const current_scroll = scroll_state();

		// clicked on a link. preserve scroll state
		scroll_history[cid] = current_scroll;

		id = cid = ++uid;
		scroll_history[cid] = noscroll ? current_scroll : { x: 0, y: 0 };
	}

	cid = id;

	if (root_component) stores.preloading.set(true);

	const loaded = prefetching && prefetching.href === target.href ?
		prefetching.promise :
		hydrate_target(target);

	prefetching = null;

	const token = current_token = {};
	const { redirect, props, branch } = await loaded;
	if (token !== current_token) return; // a secondary navigation happened while we were loading

	await render(redirect, branch, props, target.page);
	if (document.activeElement) document.activeElement.blur();

	if (!noscroll) {
		let scroll = scroll_history[id];

		if (hash) {
			// scroll is an element id (from a hash), we need to compute y.
			const deep_linked = document.getElementById(hash.slice(1));

			if (deep_linked) {
				scroll = {
					x: 0,
					y: deep_linked.getBoundingClientRect().top + scrollY
				};
			}
		}

		scroll_history[cid] = scroll;
		if (scroll) scrollTo(scroll.x, scroll.y);
	}
}

async function render(redirect, branch, props, page) {
	if (redirect) return goto(redirect.location, { replaceState: true });

	stores.page.set(page);
	stores.preloading.set(false);

	if (root_component) {
		root_component.$set(props);
	} else {
		props.stores = {
			page: { subscribe: stores.page.subscribe },
			preloading: { subscribe: stores.preloading.subscribe },
			session: stores.session
		};
		props.level0 = {
			props: await root_preloaded
		};
		props.notify = stores.page.notify;

		// first load — remove SSR'd <head> contents
		const start = document.querySelector('#sapper-head-start');
		const end = document.querySelector('#sapper-head-end');

		if (start && end) {
			while (start.nextSibling !== end) detach$1(start.nextSibling);
			detach$1(start);
			detach$1(end);
		}

		root_component = new App({
			target,
			props,
			hydrate: true
		});
	}

	current_branch = branch;
	current_query = JSON.stringify(page.query);
	ready = true;
	session_dirty = false;
}

function part_changed(i, segment, match, stringified_query) {
	// TODO only check query string changes for preload functions
	// that do in fact depend on it (using static analysis or
	// runtime instrumentation)
	if (stringified_query !== current_query) return true;

	const previous = current_branch[i];

	if (!previous) return false;
	if (segment !== previous.segment) return true;
	if (previous.match) {
		if (JSON.stringify(previous.match.slice(1, i + 2)) !== JSON.stringify(match.slice(1, i + 2))) {
			return true;
		}
	}
}

async function hydrate_target(target)



 {
	const { route, page } = target;
	const segments = page.path.split('/').filter(Boolean);

	let redirect = null;

	const props = { error: null, status: 200, segments: [segments[0]] };

	const preload_context = {
		fetch: (url, opts) => fetch(url, opts),
		redirect: (statusCode, location) => {
			if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
				throw new Error(`Conflicting redirects`);
			}
			redirect = { statusCode, location };
		},
		error: (status, error) => {
			props.error = typeof error === 'string' ? new Error(error) : error;
			props.status = status;
		}
	};

	if (!root_preloaded) {
		root_preloaded = initial_data.preloaded[0] || preload.call(preload_context, {
			host: page.host,
			path: page.path,
			query: page.query,
			params: {}
		}, $session);
	}

	let branch;
	let l = 1;

	try {
		const stringified_query = JSON.stringify(page.query);
		const match = route.pattern.exec(page.path);

		let segment_dirty = false;

		branch = await Promise.all(route.parts.map(async (part, i) => {
			const segment = segments[i];

			if (part_changed(i, segment, match, stringified_query)) segment_dirty = true;

			props.segments[l] = segments[i + 1]; // TODO make this less confusing
			if (!part) return { segment };

			const j = l++;

			if (!session_dirty && !segment_dirty && current_branch[i] && current_branch[i].part === part.i) {
				return current_branch[i];
			}

			segment_dirty = false;

			const { default: component, preload } = await load_component(components[part.i]);

			let preloaded;
			if (ready || !initial_data.preloaded[i + 1]) {
				preloaded = preload
					? await preload.call(preload_context, {
						host: page.host,
						path: page.path,
						query: page.query,
						params: part.params ? part.params(target.match) : {}
					}, $session)
					: {};
			} else {
				preloaded = initial_data.preloaded[i + 1];
			}

			return (props[`level${j}`] = { component, props: preloaded, segment, match, part: part.i });
		}));
	} catch (error) {
		props.error = error;
		props.status = 500;
		branch = [];
	}

	return { redirect, props, branch };
}

function load_css(chunk) {
	const href = `client/${chunk}`;
	if (document.querySelector(`link[href="${href}"]`)) return;

	return new Promise((fulfil, reject) => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = href;

		link.onload = () => fulfil();
		link.onerror = reject;

		document.head.appendChild(link);
	});
}

function load_component(component)


 {
	// TODO this is temporary — once placeholders are
	// always rewritten, scratch the ternary
	const promises = (typeof component.css === 'string' ? [] : component.css.map(load_css));
	promises.unshift(component.js());
	return Promise.all(promises).then(values => values[0]);
}

function detach$1(node) {
	node.parentNode.removeChild(node);
}

function prefetch(href) {
	const target = select_target(new URL(href, document.baseURI));

	if (target) {
		if (!prefetching || href !== prefetching.href) {
			set_prefetching(href, hydrate_target(target));
		}

		return prefetching.promise;
	}
}

function start(opts

) {
	if ('scrollRestoration' in _history) {
		_history.scrollRestoration = 'manual';
	}
	
	// Adopted from Nuxt.js
	// Reset scrollRestoration to auto when leaving page, allowing page reload
	// and back-navigation from other pages to use the browser to restore the
	// scrolling position.
	addEventListener('beforeunload', () => {
		_history.scrollRestoration = 'auto';
	});

	// Setting scrollRestoration to manual again when returning to this page.
	addEventListener('load', () => {
		_history.scrollRestoration = 'manual';
	});

	set_target(opts.target);

	addEventListener('click', handle_click);
	addEventListener('popstate', handle_popstate);

	// prefetch
	addEventListener('touchstart', trigger_prefetch);
	addEventListener('mousemove', handle_mousemove);

	return Promise.resolve().then(() => {
		const { hash, href } = location;

		_history.replaceState({ id: uid }, '', href);

		const url = new URL(location.href);

		if (initial_data.error) return handle_error();

		const target = select_target(url);
		if (target) return navigate(target, uid, true, hash);
	});
}

let mousemove_timeout;

function handle_mousemove(event) {
	clearTimeout(mousemove_timeout);
	mousemove_timeout = setTimeout(() => {
		trigger_prefetch(event);
	}, 20);
}

function trigger_prefetch(event) {
	const a = find_anchor(event.target);
	if (!a || a.rel !== 'prefetch') return;

	prefetch(a.href);
}

function handle_click(event) {
	// Adapted from https://github.com/visionmedia/page.js
	// MIT license https://github.com/visionmedia/page.js#license
	if (which(event) !== 1) return;
	if (event.metaKey || event.ctrlKey || event.shiftKey) return;
	if (event.defaultPrevented) return;

	const a = find_anchor(event.target);
	if (!a) return;

	if (!a.href) return;

	// check if link is inside an svg
	// in this case, both href and target are always inside an object
	const svg = typeof a.href === 'object' && a.href.constructor.name === 'SVGAnimatedString';
	const href = String(svg ? (a).href.baseVal : a.href);

	if (href === location.href) {
		if (!location.hash) event.preventDefault();
		return;
	}

	// Ignore if tag has
	// 1. 'download' attribute
	// 2. rel='external' attribute
	if (a.hasAttribute('download') || a.getAttribute('rel') === 'external') return;

	// Ignore if <a> has a target
	if (svg ? (a).target.baseVal : a.target) return;

	const url = new URL(href);

	// Don't handle hash changes
	if (url.pathname === location.pathname && url.search === location.search) return;

	const target = select_target(url);
	if (target) {
		const noscroll = a.hasAttribute('sapper-noscroll');
		navigate(target, null, noscroll, url.hash);
		event.preventDefault();
		_history.pushState({ id: cid }, '', url.href);
	}
}

function which(event) {
	return event.which === null ? event.button : event.which;
}

function find_anchor(node) {
	while (node && node.nodeName.toUpperCase() !== 'A') node = node.parentNode; // SVG <a> elements have a lowercase name
	return node;
}

function handle_popstate(event) {
	scroll_history[cid] = scroll_state();

	if (event.state) {
		const url = new URL(location.href);
		const target = select_target(url);
		if (target) {
			navigate(target, event.state.id);
		} else {
			location.href = location.href;
		}
	} else {
		// hashchange
		set_uid(uid + 1);
		set_cid(uid);
		_history.replaceState({ id: cid }, '', location.href);
	}
}

const stores$1 = () => getContext(CONTEXT_KEY);

start({
	target: document.querySelector('#sapper')
});

export { blur as A, slide as B, scale as C, fly as D, quintOut as E, quartInOut as F, query_selector_all as G, add_render_callback as H, create_in_transition as I, null_to_empty as J, set_data_dev as K, HtmlTag as L, validate_each_argument as M, group_outros as N, check_outros as O, destroy_each as P, empty as Q, listen_dev as R, SvelteComponentDev as S, TextAnimation as T, create_bidirectional_transition as U, run_all as V, children as a, detach_dev as b, claim_element as c, dispatch_dev as d, element as e, attr_dev as f, add_location as g, insert_dev as h, init as i, append_dev as j, space as k, claim_text as l, claim_space as m, noop as n, onMount as o, create_component as p, claim_component as q, mount_component as r, safe_not_equal as s, text as t, transition_in as u, validate_slots as v, transition_out as w, destroy_component as x, draw as y, fade as z };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmMyNDRiNTM3LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3ZlbHRlL2ludGVybmFsL2luZGV4Lm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3RvcmUvaW5kZXgubWpzIiwiLi4vLi4vLi4vc3JjL25vZGVfbW9kdWxlcy9Ac2FwcGVyL2ludGVybmFsL3NoYXJlZC5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3ZlbHRlL2Vhc2luZy9pbmRleC5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3RyYW5zaXRpb24vaW5kZXgubWpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvZ2xvYmFsLWNvbXBvbmVudHMvbmF2aWdhdGlvbi9IYW1idXJnZXIuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvY29tbW9uLWNvbXBvbmVudHMvbW9kYWxzL01vZGFsVGVtcGxhdGUuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvY29tbW9uLWNvbXBvbmVudHMvbW9kYWxzL0NvbnRhY3RNb2RhbC5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9nbG9iYWwtY29tcG9uZW50cy9uYXZpZ2F0aW9uL0xvZ28uc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvY29tbW9uLWNvbXBvbmVudHMvVGV4dEFuaW1hdGlvbi5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9nbG9iYWwtY29tcG9uZW50cy9uYXZpZ2F0aW9uL05hdmlnYXRpb24uc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvZ2xvYmFsLWNvbXBvbmVudHMvRm9vdGVyLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2dsb2JhbC1jb21wb25lbnRzL0ZpcnN0TG9hZFBhZ2VBbmltYXRpb24uc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9fbGF5b3V0LnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvX2Vycm9yLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9ub2RlX21vZHVsZXMvQHNhcHBlci9pbnRlcm5hbC9BcHAuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL25vZGVfbW9kdWxlcy9Ac2FwcGVyL2ludGVybmFsL21hbmlmZXN0LWNsaWVudC5tanMiLCIuLi8uLi8uLi9zcmMvbm9kZV9tb2R1bGVzL0BzYXBwZXIvYXBwLm1qcyIsIi4uLy4uLy4uL3NyYy9jbGllbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gbm9vcCgpIHsgfVxuY29uc3QgaWRlbnRpdHkgPSB4ID0+IHg7XG5mdW5jdGlvbiBhc3NpZ24odGFyLCBzcmMpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgZm9yIChjb25zdCBrIGluIHNyYylcbiAgICAgICAgdGFyW2tdID0gc3JjW2tdO1xuICAgIHJldHVybiB0YXI7XG59XG5mdW5jdGlvbiBpc19wcm9taXNlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbic7XG59XG5mdW5jdGlvbiBhZGRfbG9jYXRpb24oZWxlbWVudCwgZmlsZSwgbGluZSwgY29sdW1uLCBjaGFyKSB7XG4gICAgZWxlbWVudC5fX3N2ZWx0ZV9tZXRhID0ge1xuICAgICAgICBsb2M6IHsgZmlsZSwgbGluZSwgY29sdW1uLCBjaGFyIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gcnVuKGZuKSB7XG4gICAgcmV0dXJuIGZuKCk7XG59XG5mdW5jdGlvbiBibGFua19vYmplY3QoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5jcmVhdGUobnVsbCk7XG59XG5mdW5jdGlvbiBydW5fYWxsKGZucykge1xuICAgIGZucy5mb3JFYWNoKHJ1bik7XG59XG5mdW5jdGlvbiBpc19mdW5jdGlvbih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09ICdmdW5jdGlvbic7XG59XG5mdW5jdGlvbiBzYWZlX25vdF9lcXVhbChhLCBiKSB7XG4gICAgcmV0dXJuIGEgIT0gYSA/IGIgPT0gYiA6IGEgIT09IGIgfHwgKChhICYmIHR5cGVvZiBhID09PSAnb2JqZWN0JykgfHwgdHlwZW9mIGEgPT09ICdmdW5jdGlvbicpO1xufVxuZnVuY3Rpb24gbm90X2VxdWFsKGEsIGIpIHtcbiAgICByZXR1cm4gYSAhPSBhID8gYiA9PSBiIDogYSAhPT0gYjtcbn1cbmZ1bmN0aW9uIGlzX2VtcHR5KG9iaikge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLmxlbmd0aCA9PT0gMDtcbn1cbmZ1bmN0aW9uIHZhbGlkYXRlX3N0b3JlKHN0b3JlLCBuYW1lKSB7XG4gICAgaWYgKHN0b3JlICE9IG51bGwgJiYgdHlwZW9mIHN0b3JlLnN1YnNjcmliZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCcke25hbWV9JyBpcyBub3QgYSBzdG9yZSB3aXRoIGEgJ3N1YnNjcmliZScgbWV0aG9kYCk7XG4gICAgfVxufVxuZnVuY3Rpb24gc3Vic2NyaWJlKHN0b3JlLCAuLi5jYWxsYmFja3MpIHtcbiAgICBpZiAoc3RvcmUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbm9vcDtcbiAgICB9XG4gICAgY29uc3QgdW5zdWIgPSBzdG9yZS5zdWJzY3JpYmUoLi4uY2FsbGJhY2tzKTtcbiAgICByZXR1cm4gdW5zdWIudW5zdWJzY3JpYmUgPyAoKSA9PiB1bnN1Yi51bnN1YnNjcmliZSgpIDogdW5zdWI7XG59XG5mdW5jdGlvbiBnZXRfc3RvcmVfdmFsdWUoc3RvcmUpIHtcbiAgICBsZXQgdmFsdWU7XG4gICAgc3Vic2NyaWJlKHN0b3JlLCBfID0+IHZhbHVlID0gXykoKTtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5mdW5jdGlvbiBjb21wb25lbnRfc3Vic2NyaWJlKGNvbXBvbmVudCwgc3RvcmUsIGNhbGxiYWNrKSB7XG4gICAgY29tcG9uZW50LiQkLm9uX2Rlc3Ryb3kucHVzaChzdWJzY3JpYmUoc3RvcmUsIGNhbGxiYWNrKSk7XG59XG5mdW5jdGlvbiBjcmVhdGVfc2xvdChkZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGZuKSB7XG4gICAgaWYgKGRlZmluaXRpb24pIHtcbiAgICAgICAgY29uc3Qgc2xvdF9jdHggPSBnZXRfc2xvdF9jb250ZXh0KGRlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZm4pO1xuICAgICAgICByZXR1cm4gZGVmaW5pdGlvblswXShzbG90X2N0eCk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0X3Nsb3RfY29udGV4dChkZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGZuKSB7XG4gICAgcmV0dXJuIGRlZmluaXRpb25bMV0gJiYgZm5cbiAgICAgICAgPyBhc3NpZ24oJCRzY29wZS5jdHguc2xpY2UoKSwgZGVmaW5pdGlvblsxXShmbihjdHgpKSlcbiAgICAgICAgOiAkJHNjb3BlLmN0eDtcbn1cbmZ1bmN0aW9uIGdldF9zbG90X2NoYW5nZXMoZGVmaW5pdGlvbiwgJCRzY29wZSwgZGlydHksIGZuKSB7XG4gICAgaWYgKGRlZmluaXRpb25bMl0gJiYgZm4pIHtcbiAgICAgICAgY29uc3QgbGV0cyA9IGRlZmluaXRpb25bMl0oZm4oZGlydHkpKTtcbiAgICAgICAgaWYgKCQkc2NvcGUuZGlydHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGxldHM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBsZXRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgY29uc3QgbWVyZ2VkID0gW107XG4gICAgICAgICAgICBjb25zdCBsZW4gPSBNYXRoLm1heCgkJHNjb3BlLmRpcnR5Lmxlbmd0aCwgbGV0cy5sZW5ndGgpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIG1lcmdlZFtpXSA9ICQkc2NvcGUuZGlydHlbaV0gfCBsZXRzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1lcmdlZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJCRzY29wZS5kaXJ0eSB8IGxldHM7XG4gICAgfVxuICAgIHJldHVybiAkJHNjb3BlLmRpcnR5O1xufVxuZnVuY3Rpb24gdXBkYXRlX3Nsb3Qoc2xvdCwgc2xvdF9kZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGRpcnR5LCBnZXRfc2xvdF9jaGFuZ2VzX2ZuLCBnZXRfc2xvdF9jb250ZXh0X2ZuKSB7XG4gICAgY29uc3Qgc2xvdF9jaGFuZ2VzID0gZ2V0X3Nsb3RfY2hhbmdlcyhzbG90X2RlZmluaXRpb24sICQkc2NvcGUsIGRpcnR5LCBnZXRfc2xvdF9jaGFuZ2VzX2ZuKTtcbiAgICBpZiAoc2xvdF9jaGFuZ2VzKSB7XG4gICAgICAgIGNvbnN0IHNsb3RfY29udGV4dCA9IGdldF9zbG90X2NvbnRleHQoc2xvdF9kZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGdldF9zbG90X2NvbnRleHRfZm4pO1xuICAgICAgICBzbG90LnAoc2xvdF9jb250ZXh0LCBzbG90X2NoYW5nZXMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGV4Y2x1ZGVfaW50ZXJuYWxfcHJvcHMocHJvcHMpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGsgaW4gcHJvcHMpXG4gICAgICAgIGlmIChrWzBdICE9PSAnJCcpXG4gICAgICAgICAgICByZXN1bHRba10gPSBwcm9wc1trXTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gY29tcHV0ZV9yZXN0X3Byb3BzKHByb3BzLCBrZXlzKSB7XG4gICAgY29uc3QgcmVzdCA9IHt9O1xuICAgIGtleXMgPSBuZXcgU2V0KGtleXMpO1xuICAgIGZvciAoY29uc3QgayBpbiBwcm9wcylcbiAgICAgICAgaWYgKCFrZXlzLmhhcyhrKSAmJiBrWzBdICE9PSAnJCcpXG4gICAgICAgICAgICByZXN0W2tdID0gcHJvcHNba107XG4gICAgcmV0dXJuIHJlc3Q7XG59XG5mdW5jdGlvbiBjb21wdXRlX3Nsb3RzKHNsb3RzKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgaW4gc2xvdHMpIHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gb25jZShmbikge1xuICAgIGxldCByYW4gPSBmYWxzZTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgaWYgKHJhbilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgcmFuID0gdHJ1ZTtcbiAgICAgICAgZm4uY2FsbCh0aGlzLCAuLi5hcmdzKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gbnVsbF90b19lbXB0eSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIHNldF9zdG9yZV92YWx1ZShzdG9yZSwgcmV0LCB2YWx1ZSA9IHJldCkge1xuICAgIHN0b3JlLnNldCh2YWx1ZSk7XG4gICAgcmV0dXJuIHJldDtcbn1cbmNvbnN0IGhhc19wcm9wID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG5mdW5jdGlvbiBhY3Rpb25fZGVzdHJveWVyKGFjdGlvbl9yZXN1bHQpIHtcbiAgICByZXR1cm4gYWN0aW9uX3Jlc3VsdCAmJiBpc19mdW5jdGlvbihhY3Rpb25fcmVzdWx0LmRlc3Ryb3kpID8gYWN0aW9uX3Jlc3VsdC5kZXN0cm95IDogbm9vcDtcbn1cblxuY29uc3QgaXNfY2xpZW50ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XG5sZXQgbm93ID0gaXNfY2xpZW50XG4gICAgPyAoKSA9PiB3aW5kb3cucGVyZm9ybWFuY2Uubm93KClcbiAgICA6ICgpID0+IERhdGUubm93KCk7XG5sZXQgcmFmID0gaXNfY2xpZW50ID8gY2IgPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNiKSA6IG5vb3A7XG4vLyB1c2VkIGludGVybmFsbHkgZm9yIHRlc3RpbmdcbmZ1bmN0aW9uIHNldF9ub3coZm4pIHtcbiAgICBub3cgPSBmbjtcbn1cbmZ1bmN0aW9uIHNldF9yYWYoZm4pIHtcbiAgICByYWYgPSBmbjtcbn1cblxuY29uc3QgdGFza3MgPSBuZXcgU2V0KCk7XG5mdW5jdGlvbiBydW5fdGFza3Mobm93KSB7XG4gICAgdGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgaWYgKCF0YXNrLmMobm93KSkge1xuICAgICAgICAgICAgdGFza3MuZGVsZXRlKHRhc2spO1xuICAgICAgICAgICAgdGFzay5mKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodGFza3Muc2l6ZSAhPT0gMClcbiAgICAgICAgcmFmKHJ1bl90YXNrcyk7XG59XG4vKipcbiAqIEZvciB0ZXN0aW5nIHB1cnBvc2VzIG9ubHkhXG4gKi9cbmZ1bmN0aW9uIGNsZWFyX2xvb3BzKCkge1xuICAgIHRhc2tzLmNsZWFyKCk7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdGFzayB0aGF0IHJ1bnMgb24gZWFjaCByYWYgZnJhbWVcbiAqIHVudGlsIGl0IHJldHVybnMgYSBmYWxzeSB2YWx1ZSBvciBpcyBhYm9ydGVkXG4gKi9cbmZ1bmN0aW9uIGxvb3AoY2FsbGJhY2spIHtcbiAgICBsZXQgdGFzaztcbiAgICBpZiAodGFza3Muc2l6ZSA9PT0gMClcbiAgICAgICAgcmFmKHJ1bl90YXNrcyk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJvbWlzZTogbmV3IFByb21pc2UoZnVsZmlsbCA9PiB7XG4gICAgICAgICAgICB0YXNrcy5hZGQodGFzayA9IHsgYzogY2FsbGJhY2ssIGY6IGZ1bGZpbGwgfSk7XG4gICAgICAgIH0pLFxuICAgICAgICBhYm9ydCgpIHtcbiAgICAgICAgICAgIHRhc2tzLmRlbGV0ZSh0YXNrKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGFwcGVuZCh0YXJnZXQsIG5vZGUpIHtcbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQobm9kZSk7XG59XG5mdW5jdGlvbiBpbnNlcnQodGFyZ2V0LCBub2RlLCBhbmNob3IpIHtcbiAgICB0YXJnZXQuaW5zZXJ0QmVmb3JlKG5vZGUsIGFuY2hvciB8fCBudWxsKTtcbn1cbmZ1bmN0aW9uIGRldGFjaChub2RlKSB7XG4gICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xufVxuZnVuY3Rpb24gZGVzdHJveV9lYWNoKGl0ZXJhdGlvbnMsIGRldGFjaGluZykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlcmF0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoaXRlcmF0aW9uc1tpXSlcbiAgICAgICAgICAgIGl0ZXJhdGlvbnNbaV0uZChkZXRhY2hpbmcpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGVsZW1lbnQobmFtZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpO1xufVxuZnVuY3Rpb24gZWxlbWVudF9pcyhuYW1lLCBpcykge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUsIHsgaXMgfSk7XG59XG5mdW5jdGlvbiBvYmplY3Rfd2l0aG91dF9wcm9wZXJ0aWVzKG9iaiwgZXhjbHVkZSkge1xuICAgIGNvbnN0IHRhcmdldCA9IHt9O1xuICAgIGZvciAoY29uc3QgayBpbiBvYmopIHtcbiAgICAgICAgaWYgKGhhc19wcm9wKG9iaiwgaylcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICYmIGV4Y2x1ZGUuaW5kZXhPZihrKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHRhcmdldFtrXSA9IG9ialtrXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuZnVuY3Rpb24gc3ZnX2VsZW1lbnQobmFtZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgbmFtZSk7XG59XG5mdW5jdGlvbiB0ZXh0KGRhdGEpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZGF0YSk7XG59XG5mdW5jdGlvbiBzcGFjZSgpIHtcbiAgICByZXR1cm4gdGV4dCgnICcpO1xufVxuZnVuY3Rpb24gZW1wdHkoKSB7XG4gICAgcmV0dXJuIHRleHQoJycpO1xufVxuZnVuY3Rpb24gbGlzdGVuKG5vZGUsIGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKSB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICByZXR1cm4gKCkgPT4gbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHByZXZlbnRfZGVmYXVsdChmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHN0b3BfcHJvcGFnYXRpb24oZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gc2VsZihmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSB0aGlzKVxuICAgICAgICAgICAgZm4uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGF0dHIobm9kZSwgYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKVxuICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgIGVsc2UgaWYgKG5vZGUuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSkgIT09IHZhbHVlKVxuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUsIHZhbHVlKTtcbn1cbmZ1bmN0aW9uIHNldF9hdHRyaWJ1dGVzKG5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgZGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhub2RlLl9fcHJvdG9fXyk7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICBpZiAoYXR0cmlidXRlc1trZXldID09IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgICAgICAgICBub2RlLnN0eWxlLmNzc1RleHQgPSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnX192YWx1ZScpIHtcbiAgICAgICAgICAgIG5vZGUudmFsdWUgPSBub2RlW2tleV0gPSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRvcnNba2V5XSAmJiBkZXNjcmlwdG9yc1trZXldLnNldCkge1xuICAgICAgICAgICAgbm9kZVtrZXldID0gYXR0cmlidXRlc1trZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXR0cihub2RlLCBrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBzZXRfc3ZnX2F0dHJpYnV0ZXMobm9kZSwgYXR0cmlidXRlcykge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgYXR0cihub2RlLCBrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0X2N1c3RvbV9lbGVtZW50X2RhdGEobm9kZSwgcHJvcCwgdmFsdWUpIHtcbiAgICBpZiAocHJvcCBpbiBub2RlKSB7XG4gICAgICAgIG5vZGVbcHJvcF0gPSB2YWx1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGF0dHIobm9kZSwgcHJvcCwgdmFsdWUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHhsaW5rX2F0dHIobm9kZSwgYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgIG5vZGUuc2V0QXR0cmlidXRlTlMoJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLCBhdHRyaWJ1dGUsIHZhbHVlKTtcbn1cbmZ1bmN0aW9uIGdldF9iaW5kaW5nX2dyb3VwX3ZhbHVlKGdyb3VwLCBfX3ZhbHVlLCBjaGVja2VkKSB7XG4gICAgY29uc3QgdmFsdWUgPSBuZXcgU2V0KCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncm91cC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoZ3JvdXBbaV0uY2hlY2tlZClcbiAgICAgICAgICAgIHZhbHVlLmFkZChncm91cFtpXS5fX3ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKCFjaGVja2VkKSB7XG4gICAgICAgIHZhbHVlLmRlbGV0ZShfX3ZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIEFycmF5LmZyb20odmFsdWUpO1xufVxuZnVuY3Rpb24gdG9fbnVtYmVyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAnJyA/IG51bGwgOiArdmFsdWU7XG59XG5mdW5jdGlvbiB0aW1lX3Jhbmdlc190b19hcnJheShyYW5nZXMpIHtcbiAgICBjb25zdCBhcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGFycmF5LnB1c2goeyBzdGFydDogcmFuZ2VzLnN0YXJ0KGkpLCBlbmQ6IHJhbmdlcy5lbmQoaSkgfSk7XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbn1cbmZ1bmN0aW9uIGNoaWxkcmVuKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkTm9kZXMpO1xufVxuZnVuY3Rpb24gY2xhaW1fZWxlbWVudChub2RlcywgbmFtZSwgYXR0cmlidXRlcywgc3ZnKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICAgIGlmIChub2RlLm5vZGVOYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgICBsZXQgaiA9IDA7XG4gICAgICAgICAgICBjb25zdCByZW1vdmUgPSBbXTtcbiAgICAgICAgICAgIHdoaWxlIChqIDwgbm9kZS5hdHRyaWJ1dGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG5vZGUuYXR0cmlidXRlc1tqKytdO1xuICAgICAgICAgICAgICAgIGlmICghYXR0cmlidXRlc1thdHRyaWJ1dGUubmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlLnB1c2goYXR0cmlidXRlLm5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcmVtb3ZlLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUocmVtb3ZlW2tdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBub2Rlcy5zcGxpY2UoaSwgMSlbMF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN2ZyA/IHN2Z19lbGVtZW50KG5hbWUpIDogZWxlbWVudChuYW1lKTtcbn1cbmZ1bmN0aW9uIGNsYWltX3RleHQobm9kZXMsIGRhdGEpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgIG5vZGUuZGF0YSA9ICcnICsgZGF0YTtcbiAgICAgICAgICAgIHJldHVybiBub2Rlcy5zcGxpY2UoaSwgMSlbMF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRleHQoZGF0YSk7XG59XG5mdW5jdGlvbiBjbGFpbV9zcGFjZShub2Rlcykge1xuICAgIHJldHVybiBjbGFpbV90ZXh0KG5vZGVzLCAnICcpO1xufVxuZnVuY3Rpb24gc2V0X2RhdGEodGV4dCwgZGF0YSkge1xuICAgIGRhdGEgPSAnJyArIGRhdGE7XG4gICAgaWYgKHRleHQud2hvbGVUZXh0ICE9PSBkYXRhKVxuICAgICAgICB0ZXh0LmRhdGEgPSBkYXRhO1xufVxuZnVuY3Rpb24gc2V0X2lucHV0X3ZhbHVlKGlucHV0LCB2YWx1ZSkge1xuICAgIGlucHV0LnZhbHVlID0gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG59XG5mdW5jdGlvbiBzZXRfaW5wdXRfdHlwZShpbnB1dCwgdHlwZSkge1xuICAgIHRyeSB7XG4gICAgICAgIGlucHV0LnR5cGUgPSB0eXBlO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgfVxufVxuZnVuY3Rpb24gc2V0X3N0eWxlKG5vZGUsIGtleSwgdmFsdWUsIGltcG9ydGFudCkge1xuICAgIG5vZGUuc3R5bGUuc2V0UHJvcGVydHkoa2V5LCB2YWx1ZSwgaW1wb3J0YW50ID8gJ2ltcG9ydGFudCcgOiAnJyk7XG59XG5mdW5jdGlvbiBzZWxlY3Rfb3B0aW9uKHNlbGVjdCwgdmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdC5vcHRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHNlbGVjdC5vcHRpb25zW2ldO1xuICAgICAgICBpZiAob3B0aW9uLl9fdmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gc2VsZWN0X29wdGlvbnMoc2VsZWN0LCB2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0Lm9wdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gc2VsZWN0Lm9wdGlvbnNbaV07XG4gICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IH52YWx1ZS5pbmRleE9mKG9wdGlvbi5fX3ZhbHVlKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzZWxlY3RfdmFsdWUoc2VsZWN0KSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRfb3B0aW9uID0gc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJzpjaGVja2VkJykgfHwgc2VsZWN0Lm9wdGlvbnNbMF07XG4gICAgcmV0dXJuIHNlbGVjdGVkX29wdGlvbiAmJiBzZWxlY3RlZF9vcHRpb24uX192YWx1ZTtcbn1cbmZ1bmN0aW9uIHNlbGVjdF9tdWx0aXBsZV92YWx1ZShzZWxlY3QpIHtcbiAgICByZXR1cm4gW10ubWFwLmNhbGwoc2VsZWN0LnF1ZXJ5U2VsZWN0b3JBbGwoJzpjaGVja2VkJyksIG9wdGlvbiA9PiBvcHRpb24uX192YWx1ZSk7XG59XG4vLyB1bmZvcnR1bmF0ZWx5IHRoaXMgY2FuJ3QgYmUgYSBjb25zdGFudCBhcyB0aGF0IHdvdWxkbid0IGJlIHRyZWUtc2hha2VhYmxlXG4vLyBzbyB3ZSBjYWNoZSB0aGUgcmVzdWx0IGluc3RlYWRcbmxldCBjcm9zc29yaWdpbjtcbmZ1bmN0aW9uIGlzX2Nyb3Nzb3JpZ2luKCkge1xuICAgIGlmIChjcm9zc29yaWdpbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNyb3Nzb3JpZ2luID0gZmFsc2U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnBhcmVudCkge1xuICAgICAgICAgICAgICAgIHZvaWQgd2luZG93LnBhcmVudC5kb2N1bWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNyb3Nzb3JpZ2luID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3Jvc3NvcmlnaW47XG59XG5mdW5jdGlvbiBhZGRfcmVzaXplX2xpc3RlbmVyKG5vZGUsIGZuKSB7XG4gICAgY29uc3QgY29tcHV0ZWRfc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgIGNvbnN0IHpfaW5kZXggPSAocGFyc2VJbnQoY29tcHV0ZWRfc3R5bGUuekluZGV4KSB8fCAwKSAtIDE7XG4gICAgaWYgKGNvbXB1dGVkX3N0eWxlLnBvc2l0aW9uID09PSAnc3RhdGljJykge1xuICAgICAgICBub2RlLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICB9XG4gICAgY29uc3QgaWZyYW1lID0gZWxlbWVudCgnaWZyYW1lJyk7XG4gICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTogYmxvY2s7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyBsZWZ0OiAwOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyAnICtcbiAgICAgICAgYG92ZXJmbG93OiBoaWRkZW47IGJvcmRlcjogMDsgb3BhY2l0eTogMDsgcG9pbnRlci1ldmVudHM6IG5vbmU7IHotaW5kZXg6ICR7el9pbmRleH07YCk7XG4gICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIGlmcmFtZS50YWJJbmRleCA9IC0xO1xuICAgIGNvbnN0IGNyb3Nzb3JpZ2luID0gaXNfY3Jvc3NvcmlnaW4oKTtcbiAgICBsZXQgdW5zdWJzY3JpYmU7XG4gICAgaWYgKGNyb3Nzb3JpZ2luKSB7XG4gICAgICAgIGlmcmFtZS5zcmMgPSBcImRhdGE6dGV4dC9odG1sLDxzY3JpcHQ+b25yZXNpemU9ZnVuY3Rpb24oKXtwYXJlbnQucG9zdE1lc3NhZ2UoMCwnKicpfTwvc2NyaXB0PlwiO1xuICAgICAgICB1bnN1YnNjcmliZSA9IGxpc3Rlbih3aW5kb3csICdtZXNzYWdlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSBpZnJhbWUuY29udGVudFdpbmRvdylcbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmcmFtZS5zcmMgPSAnYWJvdXQ6YmxhbmsnO1xuICAgICAgICBpZnJhbWUub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUgPSBsaXN0ZW4oaWZyYW1lLmNvbnRlbnRXaW5kb3csICdyZXNpemUnLCBmbik7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGFwcGVuZChub2RlLCBpZnJhbWUpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChjcm9zc29yaWdpbikge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh1bnN1YnNjcmliZSAmJiBpZnJhbWUuY29udGVudFdpbmRvdykge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICBkZXRhY2goaWZyYW1lKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gdG9nZ2xlX2NsYXNzKGVsZW1lbnQsIG5hbWUsIHRvZ2dsZSkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0W3RvZ2dsZSA/ICdhZGQnIDogJ3JlbW92ZSddKG5hbWUpO1xufVxuZnVuY3Rpb24gY3VzdG9tX2V2ZW50KHR5cGUsIGRldGFpbCkge1xuICAgIGNvbnN0IGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICBlLmluaXRDdXN0b21FdmVudCh0eXBlLCBmYWxzZSwgZmFsc2UsIGRldGFpbCk7XG4gICAgcmV0dXJuIGU7XG59XG5mdW5jdGlvbiBxdWVyeV9zZWxlY3Rvcl9hbGwoc2VsZWN0b3IsIHBhcmVudCA9IGRvY3VtZW50LmJvZHkpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShwYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xufVxuY2xhc3MgSHRtbFRhZyB7XG4gICAgY29uc3RydWN0b3IoYW5jaG9yID0gbnVsbCkge1xuICAgICAgICB0aGlzLmEgPSBhbmNob3I7XG4gICAgICAgIHRoaXMuZSA9IHRoaXMubiA9IG51bGw7XG4gICAgfVxuICAgIG0oaHRtbCwgdGFyZ2V0LCBhbmNob3IgPSBudWxsKSB7XG4gICAgICAgIGlmICghdGhpcy5lKSB7XG4gICAgICAgICAgICB0aGlzLmUgPSBlbGVtZW50KHRhcmdldC5ub2RlTmFtZSk7XG4gICAgICAgICAgICB0aGlzLnQgPSB0YXJnZXQ7XG4gICAgICAgICAgICB0aGlzLmgoaHRtbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pKGFuY2hvcik7XG4gICAgfVxuICAgIGgoaHRtbCkge1xuICAgICAgICB0aGlzLmUuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgdGhpcy5uID0gQXJyYXkuZnJvbSh0aGlzLmUuY2hpbGROb2Rlcyk7XG4gICAgfVxuICAgIGkoYW5jaG9yKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5uLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBpbnNlcnQodGhpcy50LCB0aGlzLm5baV0sIGFuY2hvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcChodG1sKSB7XG4gICAgICAgIHRoaXMuZCgpO1xuICAgICAgICB0aGlzLmgoaHRtbCk7XG4gICAgICAgIHRoaXMuaSh0aGlzLmEpO1xuICAgIH1cbiAgICBkKCkge1xuICAgICAgICB0aGlzLm4uZm9yRWFjaChkZXRhY2gpO1xuICAgIH1cbn1cblxuY29uc3QgYWN0aXZlX2RvY3MgPSBuZXcgU2V0KCk7XG5sZXQgYWN0aXZlID0gMDtcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kYXJrc2t5YXBwL3N0cmluZy1oYXNoL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG5mdW5jdGlvbiBoYXNoKHN0cikge1xuICAgIGxldCBoYXNoID0gNTM4MTtcbiAgICBsZXQgaSA9IHN0ci5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSlcbiAgICAgICAgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpIF4gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGhhc2ggPj4+IDA7XG59XG5mdW5jdGlvbiBjcmVhdGVfcnVsZShub2RlLCBhLCBiLCBkdXJhdGlvbiwgZGVsYXksIGVhc2UsIGZuLCB1aWQgPSAwKSB7XG4gICAgY29uc3Qgc3RlcCA9IDE2LjY2NiAvIGR1cmF0aW9uO1xuICAgIGxldCBrZXlmcmFtZXMgPSAne1xcbic7XG4gICAgZm9yIChsZXQgcCA9IDA7IHAgPD0gMTsgcCArPSBzdGVwKSB7XG4gICAgICAgIGNvbnN0IHQgPSBhICsgKGIgLSBhKSAqIGVhc2UocCk7XG4gICAgICAgIGtleWZyYW1lcyArPSBwICogMTAwICsgYCV7JHtmbih0LCAxIC0gdCl9fVxcbmA7XG4gICAgfVxuICAgIGNvbnN0IHJ1bGUgPSBrZXlmcmFtZXMgKyBgMTAwJSB7JHtmbihiLCAxIC0gYil9fVxcbn1gO1xuICAgIGNvbnN0IG5hbWUgPSBgX19zdmVsdGVfJHtoYXNoKHJ1bGUpfV8ke3VpZH1gO1xuICAgIGNvbnN0IGRvYyA9IG5vZGUub3duZXJEb2N1bWVudDtcbiAgICBhY3RpdmVfZG9jcy5hZGQoZG9jKTtcbiAgICBjb25zdCBzdHlsZXNoZWV0ID0gZG9jLl9fc3ZlbHRlX3N0eWxlc2hlZXQgfHwgKGRvYy5fX3N2ZWx0ZV9zdHlsZXNoZWV0ID0gZG9jLmhlYWQuYXBwZW5kQ2hpbGQoZWxlbWVudCgnc3R5bGUnKSkuc2hlZXQpO1xuICAgIGNvbnN0IGN1cnJlbnRfcnVsZXMgPSBkb2MuX19zdmVsdGVfcnVsZXMgfHwgKGRvYy5fX3N2ZWx0ZV9ydWxlcyA9IHt9KTtcbiAgICBpZiAoIWN1cnJlbnRfcnVsZXNbbmFtZV0pIHtcbiAgICAgICAgY3VycmVudF9ydWxlc1tuYW1lXSA9IHRydWU7XG4gICAgICAgIHN0eWxlc2hlZXQuaW5zZXJ0UnVsZShgQGtleWZyYW1lcyAke25hbWV9ICR7cnVsZX1gLCBzdHlsZXNoZWV0LmNzc1J1bGVzLmxlbmd0aCk7XG4gICAgfVxuICAgIGNvbnN0IGFuaW1hdGlvbiA9IG5vZGUuc3R5bGUuYW5pbWF0aW9uIHx8ICcnO1xuICAgIG5vZGUuc3R5bGUuYW5pbWF0aW9uID0gYCR7YW5pbWF0aW9uID8gYCR7YW5pbWF0aW9ufSwgYCA6ICcnfSR7bmFtZX0gJHtkdXJhdGlvbn1tcyBsaW5lYXIgJHtkZWxheX1tcyAxIGJvdGhgO1xuICAgIGFjdGl2ZSArPSAxO1xuICAgIHJldHVybiBuYW1lO1xufVxuZnVuY3Rpb24gZGVsZXRlX3J1bGUobm9kZSwgbmFtZSkge1xuICAgIGNvbnN0IHByZXZpb3VzID0gKG5vZGUuc3R5bGUuYW5pbWF0aW9uIHx8ICcnKS5zcGxpdCgnLCAnKTtcbiAgICBjb25zdCBuZXh0ID0gcHJldmlvdXMuZmlsdGVyKG5hbWVcbiAgICAgICAgPyBhbmltID0+IGFuaW0uaW5kZXhPZihuYW1lKSA8IDAgLy8gcmVtb3ZlIHNwZWNpZmljIGFuaW1hdGlvblxuICAgICAgICA6IGFuaW0gPT4gYW5pbS5pbmRleE9mKCdfX3N2ZWx0ZScpID09PSAtMSAvLyByZW1vdmUgYWxsIFN2ZWx0ZSBhbmltYXRpb25zXG4gICAgKTtcbiAgICBjb25zdCBkZWxldGVkID0gcHJldmlvdXMubGVuZ3RoIC0gbmV4dC5sZW5ndGg7XG4gICAgaWYgKGRlbGV0ZWQpIHtcbiAgICAgICAgbm9kZS5zdHlsZS5hbmltYXRpb24gPSBuZXh0LmpvaW4oJywgJyk7XG4gICAgICAgIGFjdGl2ZSAtPSBkZWxldGVkO1xuICAgICAgICBpZiAoIWFjdGl2ZSlcbiAgICAgICAgICAgIGNsZWFyX3J1bGVzKCk7XG4gICAgfVxufVxuZnVuY3Rpb24gY2xlYXJfcnVsZXMoKSB7XG4gICAgcmFmKCgpID0+IHtcbiAgICAgICAgaWYgKGFjdGl2ZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgYWN0aXZlX2RvY3MuZm9yRWFjaChkb2MgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVzaGVldCA9IGRvYy5fX3N2ZWx0ZV9zdHlsZXNoZWV0O1xuICAgICAgICAgICAgbGV0IGkgPSBzdHlsZXNoZWV0LmNzc1J1bGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pXG4gICAgICAgICAgICAgICAgc3R5bGVzaGVldC5kZWxldGVSdWxlKGkpO1xuICAgICAgICAgICAgZG9jLl9fc3ZlbHRlX3J1bGVzID0ge307XG4gICAgICAgIH0pO1xuICAgICAgICBhY3RpdmVfZG9jcy5jbGVhcigpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVfYW5pbWF0aW9uKG5vZGUsIGZyb20sIGZuLCBwYXJhbXMpIHtcbiAgICBpZiAoIWZyb20pXG4gICAgICAgIHJldHVybiBub29wO1xuICAgIGNvbnN0IHRvID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBpZiAoZnJvbS5sZWZ0ID09PSB0by5sZWZ0ICYmIGZyb20ucmlnaHQgPT09IHRvLnJpZ2h0ICYmIGZyb20udG9wID09PSB0by50b3AgJiYgZnJvbS5ib3R0b20gPT09IHRvLmJvdHRvbSlcbiAgICAgICAgcmV0dXJuIG5vb3A7XG4gICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgXG4gICAgLy8gQHRzLWlnbm9yZSB0b2RvOiBzaG91bGQgdGhpcyBiZSBzZXBhcmF0ZWQgZnJvbSBkZXN0cnVjdHVyaW5nPyBPciBzdGFydC9lbmQgYWRkZWQgdG8gcHVibGljIGFwaSBhbmQgZG9jdW1lbnRhdGlvbj9cbiAgICBzdGFydDogc3RhcnRfdGltZSA9IG5vdygpICsgZGVsYXksIFxuICAgIC8vIEB0cy1pZ25vcmUgdG9kbzpcbiAgICBlbmQgPSBzdGFydF90aW1lICsgZHVyYXRpb24sIHRpY2sgPSBub29wLCBjc3MgfSA9IGZuKG5vZGUsIHsgZnJvbSwgdG8gfSwgcGFyYW1zKTtcbiAgICBsZXQgcnVubmluZyA9IHRydWU7XG4gICAgbGV0IHN0YXJ0ZWQgPSBmYWxzZTtcbiAgICBsZXQgbmFtZTtcbiAgICBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgaWYgKGNzcykge1xuICAgICAgICAgICAgbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIDAsIDEsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZGVsYXkpIHtcbiAgICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgIGlmIChjc3MpXG4gICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBuYW1lKTtcbiAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgIH1cbiAgICBsb29wKG5vdyA9PiB7XG4gICAgICAgIGlmICghc3RhcnRlZCAmJiBub3cgPj0gc3RhcnRfdGltZSkge1xuICAgICAgICAgICAgc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXJ0ZWQgJiYgbm93ID49IGVuZCkge1xuICAgICAgICAgICAgdGljaygxLCAwKTtcbiAgICAgICAgICAgIHN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJ1bm5pbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnRlZCkge1xuICAgICAgICAgICAgY29uc3QgcCA9IG5vdyAtIHN0YXJ0X3RpbWU7XG4gICAgICAgICAgICBjb25zdCB0ID0gMCArIDEgKiBlYXNpbmcocCAvIGR1cmF0aW9uKTtcbiAgICAgICAgICAgIHRpY2sodCwgMSAtIHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICAgIHN0YXJ0KCk7XG4gICAgdGljaygwLCAxKTtcbiAgICByZXR1cm4gc3RvcDtcbn1cbmZ1bmN0aW9uIGZpeF9wb3NpdGlvbihub2RlKSB7XG4gICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgIGlmIChzdHlsZS5wb3NpdGlvbiAhPT0gJ2Fic29sdXRlJyAmJiBzdHlsZS5wb3NpdGlvbiAhPT0gJ2ZpeGVkJykge1xuICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHN0eWxlO1xuICAgICAgICBjb25zdCBhID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgbm9kZS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIG5vZGUuc3R5bGUud2lkdGggPSB3aWR0aDtcbiAgICAgICAgbm9kZS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIGFkZF90cmFuc2Zvcm0obm9kZSwgYSk7XG4gICAgfVxufVxuZnVuY3Rpb24gYWRkX3RyYW5zZm9ybShub2RlLCBhKSB7XG4gICAgY29uc3QgYiA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaWYgKGEubGVmdCAhPT0gYi5sZWZ0IHx8IGEudG9wICE9PSBiLnRvcCkge1xuICAgICAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IHN0eWxlLnRyYW5zZm9ybSA9PT0gJ25vbmUnID8gJycgOiBzdHlsZS50cmFuc2Zvcm07XG4gICAgICAgIG5vZGUuc3R5bGUudHJhbnNmb3JtID0gYCR7dHJhbnNmb3JtfSB0cmFuc2xhdGUoJHthLmxlZnQgLSBiLmxlZnR9cHgsICR7YS50b3AgLSBiLnRvcH1weClgO1xuICAgIH1cbn1cblxubGV0IGN1cnJlbnRfY29tcG9uZW50O1xuZnVuY3Rpb24gc2V0X2N1cnJlbnRfY29tcG9uZW50KGNvbXBvbmVudCkge1xuICAgIGN1cnJlbnRfY29tcG9uZW50ID0gY29tcG9uZW50O1xufVxuZnVuY3Rpb24gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkge1xuICAgIGlmICghY3VycmVudF9jb21wb25lbnQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRnVuY3Rpb24gY2FsbGVkIG91dHNpZGUgY29tcG9uZW50IGluaXRpYWxpemF0aW9uJyk7XG4gICAgcmV0dXJuIGN1cnJlbnRfY29tcG9uZW50O1xufVxuZnVuY3Rpb24gYmVmb3JlVXBkYXRlKGZuKSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuYmVmb3JlX3VwZGF0ZS5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIG9uTW91bnQoZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5vbl9tb3VudC5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIGFmdGVyVXBkYXRlKGZuKSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuYWZ0ZXJfdXBkYXRlLnB1c2goZm4pO1xufVxuZnVuY3Rpb24gb25EZXN0cm95KGZuKSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQub25fZGVzdHJveS5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50RGlzcGF0Y2hlcigpIHtcbiAgICBjb25zdCBjb21wb25lbnQgPSBnZXRfY3VycmVudF9jb21wb25lbnQoKTtcbiAgICByZXR1cm4gKHR5cGUsIGRldGFpbCkgPT4ge1xuICAgICAgICBjb25zdCBjYWxsYmFja3MgPSBjb21wb25lbnQuJCQuY2FsbGJhY2tzW3R5cGVdO1xuICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAvLyBUT0RPIGFyZSB0aGVyZSBzaXR1YXRpb25zIHdoZXJlIGV2ZW50cyBjb3VsZCBiZSBkaXNwYXRjaGVkXG4gICAgICAgICAgICAvLyBpbiBhIHNlcnZlciAobm9uLURPTSkgZW52aXJvbm1lbnQ/XG4gICAgICAgICAgICBjb25zdCBldmVudCA9IGN1c3RvbV9ldmVudCh0eXBlLCBkZXRhaWwpO1xuICAgICAgICAgICAgY2FsbGJhY2tzLnNsaWNlKCkuZm9yRWFjaChmbiA9PiB7XG4gICAgICAgICAgICAgICAgZm4uY2FsbChjb21wb25lbnQsIGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHNldENvbnRleHQoa2V5LCBjb250ZXh0KSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuY29udGV4dC5zZXQoa2V5LCBjb250ZXh0KTtcbn1cbmZ1bmN0aW9uIGdldENvbnRleHQoa2V5KSB7XG4gICAgcmV0dXJuIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmNvbnRleHQuZ2V0KGtleSk7XG59XG4vLyBUT0RPIGZpZ3VyZSBvdXQgaWYgd2Ugc3RpbGwgd2FudCB0byBzdXBwb3J0XG4vLyBzaG9ydGhhbmQgZXZlbnRzLCBvciBpZiB3ZSB3YW50IHRvIGltcGxlbWVudFxuLy8gYSByZWFsIGJ1YmJsaW5nIG1lY2hhbmlzbVxuZnVuY3Rpb24gYnViYmxlKGNvbXBvbmVudCwgZXZlbnQpIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSBjb21wb25lbnQuJCQuY2FsbGJhY2tzW2V2ZW50LnR5cGVdO1xuICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgY2FsbGJhY2tzLnNsaWNlKCkuZm9yRWFjaChmbiA9PiBmbihldmVudCkpO1xuICAgIH1cbn1cblxuY29uc3QgZGlydHlfY29tcG9uZW50cyA9IFtdO1xuY29uc3QgaW50cm9zID0geyBlbmFibGVkOiBmYWxzZSB9O1xuY29uc3QgYmluZGluZ19jYWxsYmFja3MgPSBbXTtcbmNvbnN0IHJlbmRlcl9jYWxsYmFja3MgPSBbXTtcbmNvbnN0IGZsdXNoX2NhbGxiYWNrcyA9IFtdO1xuY29uc3QgcmVzb2x2ZWRfcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xubGV0IHVwZGF0ZV9zY2hlZHVsZWQgPSBmYWxzZTtcbmZ1bmN0aW9uIHNjaGVkdWxlX3VwZGF0ZSgpIHtcbiAgICBpZiAoIXVwZGF0ZV9zY2hlZHVsZWQpIHtcbiAgICAgICAgdXBkYXRlX3NjaGVkdWxlZCA9IHRydWU7XG4gICAgICAgIHJlc29sdmVkX3Byb21pc2UudGhlbihmbHVzaCk7XG4gICAgfVxufVxuZnVuY3Rpb24gdGljaygpIHtcbiAgICBzY2hlZHVsZV91cGRhdGUoKTtcbiAgICByZXR1cm4gcmVzb2x2ZWRfcHJvbWlzZTtcbn1cbmZ1bmN0aW9uIGFkZF9yZW5kZXJfY2FsbGJhY2soZm4pIHtcbiAgICByZW5kZXJfY2FsbGJhY2tzLnB1c2goZm4pO1xufVxuZnVuY3Rpb24gYWRkX2ZsdXNoX2NhbGxiYWNrKGZuKSB7XG4gICAgZmx1c2hfY2FsbGJhY2tzLnB1c2goZm4pO1xufVxubGV0IGZsdXNoaW5nID0gZmFsc2U7XG5jb25zdCBzZWVuX2NhbGxiYWNrcyA9IG5ldyBTZXQoKTtcbmZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIGlmIChmbHVzaGluZylcbiAgICAgICAgcmV0dXJuO1xuICAgIGZsdXNoaW5nID0gdHJ1ZTtcbiAgICBkbyB7XG4gICAgICAgIC8vIGZpcnN0LCBjYWxsIGJlZm9yZVVwZGF0ZSBmdW5jdGlvbnNcbiAgICAgICAgLy8gYW5kIHVwZGF0ZSBjb21wb25lbnRzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlydHlfY29tcG9uZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gZGlydHlfY29tcG9uZW50c1tpXTtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjb21wb25lbnQpO1xuICAgICAgICAgICAgdXBkYXRlKGNvbXBvbmVudC4kJCk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KG51bGwpO1xuICAgICAgICBkaXJ0eV9jb21wb25lbnRzLmxlbmd0aCA9IDA7XG4gICAgICAgIHdoaWxlIChiaW5kaW5nX2NhbGxiYWNrcy5sZW5ndGgpXG4gICAgICAgICAgICBiaW5kaW5nX2NhbGxiYWNrcy5wb3AoKSgpO1xuICAgICAgICAvLyB0aGVuLCBvbmNlIGNvbXBvbmVudHMgYXJlIHVwZGF0ZWQsIGNhbGxcbiAgICAgICAgLy8gYWZ0ZXJVcGRhdGUgZnVuY3Rpb25zLiBUaGlzIG1heSBjYXVzZVxuICAgICAgICAvLyBzdWJzZXF1ZW50IHVwZGF0ZXMuLi5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJfY2FsbGJhY2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IHJlbmRlcl9jYWxsYmFja3NbaV07XG4gICAgICAgICAgICBpZiAoIXNlZW5fY2FsbGJhY2tzLmhhcyhjYWxsYmFjaykpIHtcbiAgICAgICAgICAgICAgICAvLyAuLi5zbyBndWFyZCBhZ2FpbnN0IGluZmluaXRlIGxvb3BzXG4gICAgICAgICAgICAgICAgc2Vlbl9jYWxsYmFja3MuYWRkKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlbmRlcl9jYWxsYmFja3MubGVuZ3RoID0gMDtcbiAgICB9IHdoaWxlIChkaXJ0eV9jb21wb25lbnRzLmxlbmd0aCk7XG4gICAgd2hpbGUgKGZsdXNoX2NhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgZmx1c2hfY2FsbGJhY2tzLnBvcCgpKCk7XG4gICAgfVxuICAgIHVwZGF0ZV9zY2hlZHVsZWQgPSBmYWxzZTtcbiAgICBmbHVzaGluZyA9IGZhbHNlO1xuICAgIHNlZW5fY2FsbGJhY2tzLmNsZWFyKCk7XG59XG5mdW5jdGlvbiB1cGRhdGUoJCQpIHtcbiAgICBpZiAoJCQuZnJhZ21lbnQgIT09IG51bGwpIHtcbiAgICAgICAgJCQudXBkYXRlKCk7XG4gICAgICAgIHJ1bl9hbGwoJCQuYmVmb3JlX3VwZGF0ZSk7XG4gICAgICAgIGNvbnN0IGRpcnR5ID0gJCQuZGlydHk7XG4gICAgICAgICQkLmRpcnR5ID0gWy0xXTtcbiAgICAgICAgJCQuZnJhZ21lbnQgJiYgJCQuZnJhZ21lbnQucCgkJC5jdHgsIGRpcnR5KTtcbiAgICAgICAgJCQuYWZ0ZXJfdXBkYXRlLmZvckVhY2goYWRkX3JlbmRlcl9jYWxsYmFjayk7XG4gICAgfVxufVxuXG5sZXQgcHJvbWlzZTtcbmZ1bmN0aW9uIHdhaXQoKSB7XG4gICAgaWYgKCFwcm9taXNlKSB7XG4gICAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgcHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHByb21pc2UgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5mdW5jdGlvbiBkaXNwYXRjaChub2RlLCBkaXJlY3Rpb24sIGtpbmQpIHtcbiAgICBub2RlLmRpc3BhdGNoRXZlbnQoY3VzdG9tX2V2ZW50KGAke2RpcmVjdGlvbiA/ICdpbnRybycgOiAnb3V0cm8nfSR7a2luZH1gKSk7XG59XG5jb25zdCBvdXRyb2luZyA9IG5ldyBTZXQoKTtcbmxldCBvdXRyb3M7XG5mdW5jdGlvbiBncm91cF9vdXRyb3MoKSB7XG4gICAgb3V0cm9zID0ge1xuICAgICAgICByOiAwLFxuICAgICAgICBjOiBbXSxcbiAgICAgICAgcDogb3V0cm9zIC8vIHBhcmVudCBncm91cFxuICAgIH07XG59XG5mdW5jdGlvbiBjaGVja19vdXRyb3MoKSB7XG4gICAgaWYgKCFvdXRyb3Mucikge1xuICAgICAgICBydW5fYWxsKG91dHJvcy5jKTtcbiAgICB9XG4gICAgb3V0cm9zID0gb3V0cm9zLnA7XG59XG5mdW5jdGlvbiB0cmFuc2l0aW9uX2luKGJsb2NrLCBsb2NhbCkge1xuICAgIGlmIChibG9jayAmJiBibG9jay5pKSB7XG4gICAgICAgIG91dHJvaW5nLmRlbGV0ZShibG9jayk7XG4gICAgICAgIGJsb2NrLmkobG9jYWwpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHRyYW5zaXRpb25fb3V0KGJsb2NrLCBsb2NhbCwgZGV0YWNoLCBjYWxsYmFjaykge1xuICAgIGlmIChibG9jayAmJiBibG9jay5vKSB7XG4gICAgICAgIGlmIChvdXRyb2luZy5oYXMoYmxvY2spKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBvdXRyb2luZy5hZGQoYmxvY2spO1xuICAgICAgICBvdXRyb3MuYy5wdXNoKCgpID0+IHtcbiAgICAgICAgICAgIG91dHJvaW5nLmRlbGV0ZShibG9jayk7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoZGV0YWNoKVxuICAgICAgICAgICAgICAgICAgICBibG9jay5kKDEpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBibG9jay5vKGxvY2FsKTtcbiAgICB9XG59XG5jb25zdCBudWxsX3RyYW5zaXRpb24gPSB7IGR1cmF0aW9uOiAwIH07XG5mdW5jdGlvbiBjcmVhdGVfaW5fdHJhbnNpdGlvbihub2RlLCBmbiwgcGFyYW1zKSB7XG4gICAgbGV0IGNvbmZpZyA9IGZuKG5vZGUsIHBhcmFtcyk7XG4gICAgbGV0IHJ1bm5pbmcgPSBmYWxzZTtcbiAgICBsZXQgYW5pbWF0aW9uX25hbWU7XG4gICAgbGV0IHRhc2s7XG4gICAgbGV0IHVpZCA9IDA7XG4gICAgZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICAgICAgaWYgKGFuaW1hdGlvbl9uYW1lKVxuICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSwgYW5pbWF0aW9uX25hbWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnbygpIHtcbiAgICAgICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgdGljayA9IG5vb3AsIGNzcyB9ID0gY29uZmlnIHx8IG51bGxfdHJhbnNpdGlvbjtcbiAgICAgICAgaWYgKGNzcylcbiAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgMCwgMSwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcywgdWlkKyspO1xuICAgICAgICB0aWNrKDAsIDEpO1xuICAgICAgICBjb25zdCBzdGFydF90aW1lID0gbm93KCkgKyBkZWxheTtcbiAgICAgICAgY29uc3QgZW5kX3RpbWUgPSBzdGFydF90aW1lICsgZHVyYXRpb247XG4gICAgICAgIGlmICh0YXNrKVxuICAgICAgICAgICAgdGFzay5hYm9ydCgpO1xuICAgICAgICBydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiBkaXNwYXRjaChub2RlLCB0cnVlLCAnc3RhcnQnKSk7XG4gICAgICAgIHRhc2sgPSBsb29wKG5vdyA9PiB7XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gZW5kX3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGljaygxLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgdHJ1ZSwgJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gc3RhcnRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gZWFzaW5nKChub3cgLSBzdGFydF90aW1lKSAvIGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGljayh0LCAxIC0gdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJ1bm5pbmc7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsZXQgc3RhcnRlZCA9IGZhbHNlO1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0KCkge1xuICAgICAgICAgICAgaWYgKHN0YXJ0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSk7XG4gICAgICAgICAgICBpZiAoaXNfZnVuY3Rpb24oY29uZmlnKSkge1xuICAgICAgICAgICAgICAgIGNvbmZpZyA9IGNvbmZpZygpO1xuICAgICAgICAgICAgICAgIHdhaXQoKS50aGVuKGdvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGludmFsaWRhdGUoKSB7XG4gICAgICAgICAgICBzdGFydGVkID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGVuZCgpIHtcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBjcmVhdGVfb3V0X3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcykge1xuICAgIGxldCBjb25maWcgPSBmbihub2RlLCBwYXJhbXMpO1xuICAgIGxldCBydW5uaW5nID0gdHJ1ZTtcbiAgICBsZXQgYW5pbWF0aW9uX25hbWU7XG4gICAgY29uc3QgZ3JvdXAgPSBvdXRyb3M7XG4gICAgZ3JvdXAuciArPSAxO1xuICAgIGZ1bmN0aW9uIGdvKCkge1xuICAgICAgICBjb25zdCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSAzMDAsIGVhc2luZyA9IGlkZW50aXR5LCB0aWNrID0gbm9vcCwgY3NzIH0gPSBjb25maWcgfHwgbnVsbF90cmFuc2l0aW9uO1xuICAgICAgICBpZiAoY3NzKVxuICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCAxLCAwLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgY3NzKTtcbiAgICAgICAgY29uc3Qgc3RhcnRfdGltZSA9IG5vdygpICsgZGVsYXk7XG4gICAgICAgIGNvbnN0IGVuZF90aW1lID0gc3RhcnRfdGltZSArIGR1cmF0aW9uO1xuICAgICAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IGRpc3BhdGNoKG5vZGUsIGZhbHNlLCAnc3RhcnQnKSk7XG4gICAgICAgIGxvb3Aobm93ID0+IHtcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBlbmRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICB0aWNrKDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCBmYWxzZSwgJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIS0tZ3JvdXAucikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyB3aWxsIHJlc3VsdCBpbiBgZW5kKClgIGJlaW5nIGNhbGxlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvIHdlIGRvbid0IG5lZWQgdG8gY2xlYW4gdXAgaGVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuX2FsbChncm91cC5jKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gc3RhcnRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gZWFzaW5nKChub3cgLSBzdGFydF90aW1lKSAvIGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGljaygxIC0gdCwgdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJ1bm5pbmc7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoaXNfZnVuY3Rpb24oY29uZmlnKSkge1xuICAgICAgICB3YWl0KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBjb25maWcgPSBjb25maWcoKTtcbiAgICAgICAgICAgIGdvKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZ28oKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZW5kKHJlc2V0KSB7XG4gICAgICAgICAgICBpZiAocmVzZXQgJiYgY29uZmlnLnRpY2spIHtcbiAgICAgICAgICAgICAgICBjb25maWcudGljaygxLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbl9uYW1lKVxuICAgICAgICAgICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBhbmltYXRpb25fbmFtZSk7XG4gICAgICAgICAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9iaWRpcmVjdGlvbmFsX3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcywgaW50cm8pIHtcbiAgICBsZXQgY29uZmlnID0gZm4obm9kZSwgcGFyYW1zKTtcbiAgICBsZXQgdCA9IGludHJvID8gMCA6IDE7XG4gICAgbGV0IHJ1bm5pbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgbGV0IHBlbmRpbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgbGV0IGFuaW1hdGlvbl9uYW1lID0gbnVsbDtcbiAgICBmdW5jdGlvbiBjbGVhcl9hbmltYXRpb24oKSB7XG4gICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIGFuaW1hdGlvbl9uYW1lKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5pdChwcm9ncmFtLCBkdXJhdGlvbikge1xuICAgICAgICBjb25zdCBkID0gcHJvZ3JhbS5iIC0gdDtcbiAgICAgICAgZHVyYXRpb24gKj0gTWF0aC5hYnMoZCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhOiB0LFxuICAgICAgICAgICAgYjogcHJvZ3JhbS5iLFxuICAgICAgICAgICAgZCxcbiAgICAgICAgICAgIGR1cmF0aW9uLFxuICAgICAgICAgICAgc3RhcnQ6IHByb2dyYW0uc3RhcnQsXG4gICAgICAgICAgICBlbmQ6IHByb2dyYW0uc3RhcnQgKyBkdXJhdGlvbixcbiAgICAgICAgICAgIGdyb3VwOiBwcm9ncmFtLmdyb3VwXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdvKGIpIHtcbiAgICAgICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgdGljayA9IG5vb3AsIGNzcyB9ID0gY29uZmlnIHx8IG51bGxfdHJhbnNpdGlvbjtcbiAgICAgICAgY29uc3QgcHJvZ3JhbSA9IHtcbiAgICAgICAgICAgIHN0YXJ0OiBub3coKSArIGRlbGF5LFxuICAgICAgICAgICAgYlxuICAgICAgICB9O1xuICAgICAgICBpZiAoIWIpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogaW1wcm92ZSB0eXBpbmdzXG4gICAgICAgICAgICBwcm9ncmFtLmdyb3VwID0gb3V0cm9zO1xuICAgICAgICAgICAgb3V0cm9zLnIgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocnVubmluZ19wcm9ncmFtIHx8IHBlbmRpbmdfcHJvZ3JhbSkge1xuICAgICAgICAgICAgcGVuZGluZ19wcm9ncmFtID0gcHJvZ3JhbTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgYW4gaW50cm8sIGFuZCB0aGVyZSdzIGEgZGVsYXksIHdlIG5lZWQgdG8gZG9cbiAgICAgICAgICAgIC8vIGFuIGluaXRpYWwgdGljayBhbmQvb3IgYXBwbHkgQ1NTIGFuaW1hdGlvbiBpbW1lZGlhdGVseVxuICAgICAgICAgICAgaWYgKGNzcykge1xuICAgICAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgdCwgYiwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYilcbiAgICAgICAgICAgICAgICB0aWNrKDAsIDEpO1xuICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gaW5pdChwcm9ncmFtLCBkdXJhdGlvbik7XG4gICAgICAgICAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IGRpc3BhdGNoKG5vZGUsIGIsICdzdGFydCcpKTtcbiAgICAgICAgICAgIGxvb3Aobm93ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGVuZGluZ19wcm9ncmFtICYmIG5vdyA+IHBlbmRpbmdfcHJvZ3JhbS5zdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBpbml0KHBlbmRpbmdfcHJvZ3JhbSwgZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCBydW5uaW5nX3Byb2dyYW0uYiwgJ3N0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCB0LCBydW5uaW5nX3Byb2dyYW0uYiwgcnVubmluZ19wcm9ncmFtLmR1cmF0aW9uLCAwLCBlYXNpbmcsIGNvbmZpZy5jc3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChydW5uaW5nX3Byb2dyYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBydW5uaW5nX3Byb2dyYW0uZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrKHQgPSBydW5uaW5nX3Byb2dyYW0uYiwgMSAtIHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgcnVubmluZ19wcm9ncmFtLmIsICdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGVuZGluZ19wcm9ncmFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2UncmUgZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChydW5uaW5nX3Byb2dyYW0uYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnRybyDigJQgd2UgY2FuIHRpZHkgdXAgaW1tZWRpYXRlbHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvdXRybyDigJQgbmVlZHMgdG8gYmUgY29vcmRpbmF0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEtLXJ1bm5pbmdfcHJvZ3JhbS5ncm91cC5yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuX2FsbChydW5uaW5nX3Byb2dyYW0uZ3JvdXAuYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChub3cgPj0gcnVubmluZ19wcm9ncmFtLnN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwID0gbm93IC0gcnVubmluZ19wcm9ncmFtLnN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdCA9IHJ1bm5pbmdfcHJvZ3JhbS5hICsgcnVubmluZ19wcm9ncmFtLmQgKiBlYXNpbmcocCAvIHJ1bm5pbmdfcHJvZ3JhbS5kdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrKHQsIDEgLSB0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gISEocnVubmluZ19wcm9ncmFtIHx8IHBlbmRpbmdfcHJvZ3JhbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBydW4oYikge1xuICAgICAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKGNvbmZpZykpIHtcbiAgICAgICAgICAgICAgICB3YWl0KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnID0gY29uZmlnKCk7XG4gICAgICAgICAgICAgICAgICAgIGdvKGIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ28oYik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVuZCgpIHtcbiAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gcGVuZGluZ19wcm9ncmFtID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9wcm9taXNlKHByb21pc2UsIGluZm8pIHtcbiAgICBjb25zdCB0b2tlbiA9IGluZm8udG9rZW4gPSB7fTtcbiAgICBmdW5jdGlvbiB1cGRhdGUodHlwZSwgaW5kZXgsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGluZm8udG9rZW4gIT09IHRva2VuKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpbmZvLnJlc29sdmVkID0gdmFsdWU7XG4gICAgICAgIGxldCBjaGlsZF9jdHggPSBpbmZvLmN0eDtcbiAgICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjaGlsZF9jdHggPSBjaGlsZF9jdHguc2xpY2UoKTtcbiAgICAgICAgICAgIGNoaWxkX2N0eFtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYmxvY2sgPSB0eXBlICYmIChpbmZvLmN1cnJlbnQgPSB0eXBlKShjaGlsZF9jdHgpO1xuICAgICAgICBsZXQgbmVlZHNfZmx1c2ggPSBmYWxzZTtcbiAgICAgICAgaWYgKGluZm8uYmxvY2spIHtcbiAgICAgICAgICAgIGlmIChpbmZvLmJsb2Nrcykge1xuICAgICAgICAgICAgICAgIGluZm8uYmxvY2tzLmZvckVhY2goKGJsb2NrLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSBpbmRleCAmJiBibG9jaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBfb3V0cm9zKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uX291dChibG9jaywgMSwgMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm8uYmxvY2tzW2ldID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tfb3V0cm9zKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGluZm8uYmxvY2suZCgxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJsb2NrLmMoKTtcbiAgICAgICAgICAgIHRyYW5zaXRpb25faW4oYmxvY2ssIDEpO1xuICAgICAgICAgICAgYmxvY2subShpbmZvLm1vdW50KCksIGluZm8uYW5jaG9yKTtcbiAgICAgICAgICAgIG5lZWRzX2ZsdXNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpbmZvLmJsb2NrID0gYmxvY2s7XG4gICAgICAgIGlmIChpbmZvLmJsb2NrcylcbiAgICAgICAgICAgIGluZm8uYmxvY2tzW2luZGV4XSA9IGJsb2NrO1xuICAgICAgICBpZiAobmVlZHNfZmx1c2gpIHtcbiAgICAgICAgICAgIGZsdXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzX3Byb21pc2UocHJvbWlzZSkpIHtcbiAgICAgICAgY29uc3QgY3VycmVudF9jb21wb25lbnQgPSBnZXRfY3VycmVudF9jb21wb25lbnQoKTtcbiAgICAgICAgcHJvbWlzZS50aGVuKHZhbHVlID0+IHtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjdXJyZW50X2NvbXBvbmVudCk7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby50aGVuLCAxLCBpbmZvLnZhbHVlLCB2YWx1ZSk7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQobnVsbCk7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjdXJyZW50X2NvbXBvbmVudCk7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby5jYXRjaCwgMiwgaW5mby5lcnJvciwgZXJyb3IpO1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KG51bGwpO1xuICAgICAgICAgICAgaWYgKCFpbmZvLmhhc0NhdGNoKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBpZiB3ZSBwcmV2aW91c2x5IGhhZCBhIHRoZW4vY2F0Y2ggYmxvY2ssIGRlc3Ryb3kgaXRcbiAgICAgICAgaWYgKGluZm8uY3VycmVudCAhPT0gaW5mby5wZW5kaW5nKSB7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby5wZW5kaW5nLCAwKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoaW5mby5jdXJyZW50ICE9PSBpbmZvLnRoZW4pIHtcbiAgICAgICAgICAgIHVwZGF0ZShpbmZvLnRoZW4sIDEsIGluZm8udmFsdWUsIHByb21pc2UpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaW5mby5yZXNvbHZlZCA9IHByb21pc2U7XG4gICAgfVxufVxuXG5jb25zdCBnbG9iYWxzID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgPyB3aW5kb3dcbiAgICA6IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IGdsb2JhbFRoaXNcbiAgICAgICAgOiBnbG9iYWwpO1xuXG5mdW5jdGlvbiBkZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICBibG9jay5kKDEpO1xuICAgIGxvb2t1cC5kZWxldGUoYmxvY2sua2V5KTtcbn1cbmZ1bmN0aW9uIG91dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICB0cmFuc2l0aW9uX291dChibG9jaywgMSwgMSwgKCkgPT4ge1xuICAgICAgICBsb29rdXAuZGVsZXRlKGJsb2NrLmtleSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmaXhfYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuICAgIGJsb2NrLmYoKTtcbiAgICBkZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApO1xufVxuZnVuY3Rpb24gZml4X2FuZF9vdXRyb19hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKSB7XG4gICAgYmxvY2suZigpO1xuICAgIG91dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApO1xufVxuZnVuY3Rpb24gdXBkYXRlX2tleWVkX2VhY2gob2xkX2Jsb2NrcywgZGlydHksIGdldF9rZXksIGR5bmFtaWMsIGN0eCwgbGlzdCwgbG9va3VwLCBub2RlLCBkZXN0cm95LCBjcmVhdGVfZWFjaF9ibG9jaywgbmV4dCwgZ2V0X2NvbnRleHQpIHtcbiAgICBsZXQgbyA9IG9sZF9ibG9ja3MubGVuZ3RoO1xuICAgIGxldCBuID0gbGlzdC5sZW5ndGg7XG4gICAgbGV0IGkgPSBvO1xuICAgIGNvbnN0IG9sZF9pbmRleGVzID0ge307XG4gICAgd2hpbGUgKGktLSlcbiAgICAgICAgb2xkX2luZGV4ZXNbb2xkX2Jsb2Nrc1tpXS5rZXldID0gaTtcbiAgICBjb25zdCBuZXdfYmxvY2tzID0gW107XG4gICAgY29uc3QgbmV3X2xvb2t1cCA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCBkZWx0YXMgPSBuZXcgTWFwKCk7XG4gICAgaSA9IG47XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICBjb25zdCBjaGlsZF9jdHggPSBnZXRfY29udGV4dChjdHgsIGxpc3QsIGkpO1xuICAgICAgICBjb25zdCBrZXkgPSBnZXRfa2V5KGNoaWxkX2N0eCk7XG4gICAgICAgIGxldCBibG9jayA9IGxvb2t1cC5nZXQoa2V5KTtcbiAgICAgICAgaWYgKCFibG9jaykge1xuICAgICAgICAgICAgYmxvY2sgPSBjcmVhdGVfZWFjaF9ibG9jayhrZXksIGNoaWxkX2N0eCk7XG4gICAgICAgICAgICBibG9jay5jKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZHluYW1pYykge1xuICAgICAgICAgICAgYmxvY2sucChjaGlsZF9jdHgsIGRpcnR5KTtcbiAgICAgICAgfVxuICAgICAgICBuZXdfbG9va3VwLnNldChrZXksIG5ld19ibG9ja3NbaV0gPSBibG9jayk7XG4gICAgICAgIGlmIChrZXkgaW4gb2xkX2luZGV4ZXMpXG4gICAgICAgICAgICBkZWx0YXMuc2V0KGtleSwgTWF0aC5hYnMoaSAtIG9sZF9pbmRleGVzW2tleV0pKTtcbiAgICB9XG4gICAgY29uc3Qgd2lsbF9tb3ZlID0gbmV3IFNldCgpO1xuICAgIGNvbnN0IGRpZF9tb3ZlID0gbmV3IFNldCgpO1xuICAgIGZ1bmN0aW9uIGluc2VydChibG9jaykge1xuICAgICAgICB0cmFuc2l0aW9uX2luKGJsb2NrLCAxKTtcbiAgICAgICAgYmxvY2subShub2RlLCBuZXh0KTtcbiAgICAgICAgbG9va3VwLnNldChibG9jay5rZXksIGJsb2NrKTtcbiAgICAgICAgbmV4dCA9IGJsb2NrLmZpcnN0O1xuICAgICAgICBuLS07XG4gICAgfVxuICAgIHdoaWxlIChvICYmIG4pIHtcbiAgICAgICAgY29uc3QgbmV3X2Jsb2NrID0gbmV3X2Jsb2Nrc1tuIC0gMV07XG4gICAgICAgIGNvbnN0IG9sZF9ibG9jayA9IG9sZF9ibG9ja3NbbyAtIDFdO1xuICAgICAgICBjb25zdCBuZXdfa2V5ID0gbmV3X2Jsb2NrLmtleTtcbiAgICAgICAgY29uc3Qgb2xkX2tleSA9IG9sZF9ibG9jay5rZXk7XG4gICAgICAgIGlmIChuZXdfYmxvY2sgPT09IG9sZF9ibG9jaykge1xuICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICAgICAgbmV4dCA9IG5ld19ibG9jay5maXJzdDtcbiAgICAgICAgICAgIG8tLTtcbiAgICAgICAgICAgIG4tLTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghbmV3X2xvb2t1cC5oYXMob2xkX2tleSkpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBvbGQgYmxvY2tcbiAgICAgICAgICAgIGRlc3Ryb3kob2xkX2Jsb2NrLCBsb29rdXApO1xuICAgICAgICAgICAgby0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFsb29rdXAuaGFzKG5ld19rZXkpIHx8IHdpbGxfbW92ZS5oYXMobmV3X2tleSkpIHtcbiAgICAgICAgICAgIGluc2VydChuZXdfYmxvY2spO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRpZF9tb3ZlLmhhcyhvbGRfa2V5KSkge1xuICAgICAgICAgICAgby0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlbHRhcy5nZXQobmV3X2tleSkgPiBkZWx0YXMuZ2V0KG9sZF9rZXkpKSB7XG4gICAgICAgICAgICBkaWRfbW92ZS5hZGQobmV3X2tleSk7XG4gICAgICAgICAgICBpbnNlcnQobmV3X2Jsb2NrKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdpbGxfbW92ZS5hZGQob2xkX2tleSk7XG4gICAgICAgICAgICBvLS07XG4gICAgICAgIH1cbiAgICB9XG4gICAgd2hpbGUgKG8tLSkge1xuICAgICAgICBjb25zdCBvbGRfYmxvY2sgPSBvbGRfYmxvY2tzW29dO1xuICAgICAgICBpZiAoIW5ld19sb29rdXAuaGFzKG9sZF9ibG9jay5rZXkpKVxuICAgICAgICAgICAgZGVzdHJveShvbGRfYmxvY2ssIGxvb2t1cCk7XG4gICAgfVxuICAgIHdoaWxlIChuKVxuICAgICAgICBpbnNlcnQobmV3X2Jsb2Nrc1tuIC0gMV0pO1xuICAgIHJldHVybiBuZXdfYmxvY2tzO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVfZWFjaF9rZXlzKGN0eCwgbGlzdCwgZ2V0X2NvbnRleHQsIGdldF9rZXkpIHtcbiAgICBjb25zdCBrZXlzID0gbmV3IFNldCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBrZXkgPSBnZXRfa2V5KGdldF9jb250ZXh0KGN0eCwgbGlzdCwgaSkpO1xuICAgICAgICBpZiAoa2V5cy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgaGF2ZSBkdXBsaWNhdGUga2V5cyBpbiBhIGtleWVkIGVhY2gnKTtcbiAgICAgICAgfVxuICAgICAgICBrZXlzLmFkZChrZXkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0X3NwcmVhZF91cGRhdGUobGV2ZWxzLCB1cGRhdGVzKSB7XG4gICAgY29uc3QgdXBkYXRlID0ge307XG4gICAgY29uc3QgdG9fbnVsbF9vdXQgPSB7fTtcbiAgICBjb25zdCBhY2NvdW50ZWRfZm9yID0geyAkJHNjb3BlOiAxIH07XG4gICAgbGV0IGkgPSBsZXZlbHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgY29uc3QgbyA9IGxldmVsc1tpXTtcbiAgICAgICAgY29uc3QgbiA9IHVwZGF0ZXNbaV07XG4gICAgICAgIGlmIChuKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoa2V5IGluIG4pKVxuICAgICAgICAgICAgICAgICAgICB0b19udWxsX291dFtrZXldID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIWFjY291bnRlZF9mb3Jba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVba2V5XSA9IG5ba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudGVkX2ZvcltrZXldID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXZlbHNbaV0gPSBuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbykge1xuICAgICAgICAgICAgICAgIGFjY291bnRlZF9mb3Jba2V5XSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdG9fbnVsbF9vdXQpIHtcbiAgICAgICAgaWYgKCEoa2V5IGluIHVwZGF0ZSkpXG4gICAgICAgICAgICB1cGRhdGVba2V5XSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHVwZGF0ZTtcbn1cbmZ1bmN0aW9uIGdldF9zcHJlYWRfb2JqZWN0KHNwcmVhZF9wcm9wcykge1xuICAgIHJldHVybiB0eXBlb2Ygc3ByZWFkX3Byb3BzID09PSAnb2JqZWN0JyAmJiBzcHJlYWRfcHJvcHMgIT09IG51bGwgPyBzcHJlYWRfcHJvcHMgOiB7fTtcbn1cblxuLy8gc291cmNlOiBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbmRpY2VzLmh0bWxcbmNvbnN0IGJvb2xlYW5fYXR0cmlidXRlcyA9IG5ldyBTZXQoW1xuICAgICdhbGxvd2Z1bGxzY3JlZW4nLFxuICAgICdhbGxvd3BheW1lbnRyZXF1ZXN0JyxcbiAgICAnYXN5bmMnLFxuICAgICdhdXRvZm9jdXMnLFxuICAgICdhdXRvcGxheScsXG4gICAgJ2NoZWNrZWQnLFxuICAgICdjb250cm9scycsXG4gICAgJ2RlZmF1bHQnLFxuICAgICdkZWZlcicsXG4gICAgJ2Rpc2FibGVkJyxcbiAgICAnZm9ybW5vdmFsaWRhdGUnLFxuICAgICdoaWRkZW4nLFxuICAgICdpc21hcCcsXG4gICAgJ2xvb3AnLFxuICAgICdtdWx0aXBsZScsXG4gICAgJ211dGVkJyxcbiAgICAnbm9tb2R1bGUnLFxuICAgICdub3ZhbGlkYXRlJyxcbiAgICAnb3BlbicsXG4gICAgJ3BsYXlzaW5saW5lJyxcbiAgICAncmVhZG9ubHknLFxuICAgICdyZXF1aXJlZCcsXG4gICAgJ3JldmVyc2VkJyxcbiAgICAnc2VsZWN0ZWQnXG5dKTtcblxuY29uc3QgaW52YWxpZF9hdHRyaWJ1dGVfbmFtZV9jaGFyYWN0ZXIgPSAvW1xccydcIj4vPVxcdXtGREQwfS1cXHV7RkRFRn1cXHV7RkZGRX1cXHV7RkZGRn1cXHV7MUZGRkV9XFx1ezFGRkZGfVxcdXsyRkZGRX1cXHV7MkZGRkZ9XFx1ezNGRkZFfVxcdXszRkZGRn1cXHV7NEZGRkV9XFx1ezRGRkZGfVxcdXs1RkZGRX1cXHV7NUZGRkZ9XFx1ezZGRkZFfVxcdXs2RkZGRn1cXHV7N0ZGRkV9XFx1ezdGRkZGfVxcdXs4RkZGRX1cXHV7OEZGRkZ9XFx1ezlGRkZFfVxcdXs5RkZGRn1cXHV7QUZGRkV9XFx1e0FGRkZGfVxcdXtCRkZGRX1cXHV7QkZGRkZ9XFx1e0NGRkZFfVxcdXtDRkZGRn1cXHV7REZGRkV9XFx1e0RGRkZGfVxcdXtFRkZGRX1cXHV7RUZGRkZ9XFx1e0ZGRkZFfVxcdXtGRkZGRn1cXHV7MTBGRkZFfVxcdXsxMEZGRkZ9XS91O1xuLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjYXR0cmlidXRlcy0yXG4vLyBodHRwczovL2luZnJhLnNwZWMud2hhdHdnLm9yZy8jbm9uY2hhcmFjdGVyXG5mdW5jdGlvbiBzcHJlYWQoYXJncywgY2xhc3Nlc190b19hZGQpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbih7fSwgLi4uYXJncyk7XG4gICAgaWYgKGNsYXNzZXNfdG9fYWRkKSB7XG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLmNsYXNzID09IG51bGwpIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMuY2xhc3MgPSBjbGFzc2VzX3RvX2FkZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMuY2xhc3MgKz0gJyAnICsgY2xhc3Nlc190b19hZGQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHN0ciA9ICcnO1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgIGlmIChpbnZhbGlkX2F0dHJpYnV0ZV9uYW1lX2NoYXJhY3Rlci50ZXN0KG5hbWUpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGF0dHJpYnV0ZXNbbmFtZV07XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHN0ciArPSAnICcgKyBuYW1lO1xuICAgICAgICBlbHNlIGlmIChib29sZWFuX2F0dHJpYnV0ZXMuaGFzKG5hbWUudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSlcbiAgICAgICAgICAgICAgICBzdHIgKz0gJyAnICsgbmFtZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBzdHIgKz0gYCAke25hbWV9PVwiJHtTdHJpbmcodmFsdWUpLnJlcGxhY2UoL1wiL2csICcmIzM0OycpLnJlcGxhY2UoLycvZywgJyYjMzk7Jyl9XCJgO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHN0cjtcbn1cbmNvbnN0IGVzY2FwZWQgPSB7XG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgXCInXCI6ICcmIzM5OycsXG4gICAgJyYnOiAnJmFtcDsnLFxuICAgICc8JzogJyZsdDsnLFxuICAgICc+JzogJyZndDsnXG59O1xuZnVuY3Rpb24gZXNjYXBlKGh0bWwpIHtcbiAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoL1tcIicmPD5dL2csIG1hdGNoID0+IGVzY2FwZWRbbWF0Y2hdKTtcbn1cbmZ1bmN0aW9uIGVhY2goaXRlbXMsIGZuKSB7XG4gICAgbGV0IHN0ciA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgc3RyICs9IGZuKGl0ZW1zW2ldLCBpKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cbmNvbnN0IG1pc3NpbmdfY29tcG9uZW50ID0ge1xuICAgICQkcmVuZGVyOiAoKSA9PiAnJ1xufTtcbmZ1bmN0aW9uIHZhbGlkYXRlX2NvbXBvbmVudChjb21wb25lbnQsIG5hbWUpIHtcbiAgICBpZiAoIWNvbXBvbmVudCB8fCAhY29tcG9uZW50LiQkcmVuZGVyKSB7XG4gICAgICAgIGlmIChuYW1lID09PSAnc3ZlbHRlOmNvbXBvbmVudCcpXG4gICAgICAgICAgICBuYW1lICs9ICcgdGhpcz17Li4ufSc7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgPCR7bmFtZX0+IGlzIG5vdCBhIHZhbGlkIFNTUiBjb21wb25lbnQuIFlvdSBtYXkgbmVlZCB0byByZXZpZXcgeW91ciBidWlsZCBjb25maWcgdG8gZW5zdXJlIHRoYXQgZGVwZW5kZW5jaWVzIGFyZSBjb21waWxlZCwgcmF0aGVyIHRoYW4gaW1wb3J0ZWQgYXMgcHJlLWNvbXBpbGVkIG1vZHVsZXNgKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbn1cbmZ1bmN0aW9uIGRlYnVnKGZpbGUsIGxpbmUsIGNvbHVtbiwgdmFsdWVzKSB7XG4gICAgY29uc29sZS5sb2coYHtAZGVidWd9ICR7ZmlsZSA/IGZpbGUgKyAnICcgOiAnJ30oJHtsaW5lfToke2NvbHVtbn0pYCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIGNvbnNvbGUubG9nKHZhbHVlcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIHJldHVybiAnJztcbn1cbmxldCBvbl9kZXN0cm95O1xuZnVuY3Rpb24gY3JlYXRlX3Nzcl9jb21wb25lbnQoZm4pIHtcbiAgICBmdW5jdGlvbiAkJHJlbmRlcihyZXN1bHQsIHByb3BzLCBiaW5kaW5ncywgc2xvdHMpIHtcbiAgICAgICAgY29uc3QgcGFyZW50X2NvbXBvbmVudCA9IGN1cnJlbnRfY29tcG9uZW50O1xuICAgICAgICBjb25zdCAkJCA9IHtcbiAgICAgICAgICAgIG9uX2Rlc3Ryb3ksXG4gICAgICAgICAgICBjb250ZXh0OiBuZXcgTWFwKHBhcmVudF9jb21wb25lbnQgPyBwYXJlbnRfY29tcG9uZW50LiQkLmNvbnRleHQgOiBbXSksXG4gICAgICAgICAgICAvLyB0aGVzZSB3aWxsIGJlIGltbWVkaWF0ZWx5IGRpc2NhcmRlZFxuICAgICAgICAgICAgb25fbW91bnQ6IFtdLFxuICAgICAgICAgICAgYmVmb3JlX3VwZGF0ZTogW10sXG4gICAgICAgICAgICBhZnRlcl91cGRhdGU6IFtdLFxuICAgICAgICAgICAgY2FsbGJhY2tzOiBibGFua19vYmplY3QoKVxuICAgICAgICB9O1xuICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoeyAkJCB9KTtcbiAgICAgICAgY29uc3QgaHRtbCA9IGZuKHJlc3VsdCwgcHJvcHMsIGJpbmRpbmdzLCBzbG90cyk7XG4gICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChwYXJlbnRfY29tcG9uZW50KTtcbiAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHJlbmRlcjogKHByb3BzID0ge30sIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgICAgICAgICAgb25fZGVzdHJveSA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geyB0aXRsZTogJycsIGhlYWQ6ICcnLCBjc3M6IG5ldyBTZXQoKSB9O1xuICAgICAgICAgICAgY29uc3QgaHRtbCA9ICQkcmVuZGVyKHJlc3VsdCwgcHJvcHMsIHt9LCBvcHRpb25zKTtcbiAgICAgICAgICAgIHJ1bl9hbGwob25fZGVzdHJveSk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGh0bWwsXG4gICAgICAgICAgICAgICAgY3NzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IEFycmF5LmZyb20ocmVzdWx0LmNzcykubWFwKGNzcyA9PiBjc3MuY29kZSkuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgIG1hcDogbnVsbCAvLyBUT0RPXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoZWFkOiByZXN1bHQudGl0bGUgKyByZXN1bHQuaGVhZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgJCRyZW5kZXJcbiAgICB9O1xufVxuZnVuY3Rpb24gYWRkX2F0dHJpYnV0ZShuYW1lLCB2YWx1ZSwgYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IChib29sZWFuICYmICF2YWx1ZSkpXG4gICAgICAgIHJldHVybiAnJztcbiAgICByZXR1cm4gYCAke25hbWV9JHt2YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogYD0ke3R5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyBKU09OLnN0cmluZ2lmeShlc2NhcGUodmFsdWUpKSA6IGBcIiR7dmFsdWV9XCJgfWB9YDtcbn1cbmZ1bmN0aW9uIGFkZF9jbGFzc2VzKGNsYXNzZXMpIHtcbiAgICByZXR1cm4gY2xhc3NlcyA/IGAgY2xhc3M9XCIke2NsYXNzZXN9XCJgIDogJyc7XG59XG5cbmZ1bmN0aW9uIGJpbmQoY29tcG9uZW50LCBuYW1lLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGluZGV4ID0gY29tcG9uZW50LiQkLnByb3BzW25hbWVdO1xuICAgIGlmIChpbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbXBvbmVudC4kJC5ib3VuZFtpbmRleF0gPSBjYWxsYmFjaztcbiAgICAgICAgY2FsbGJhY2soY29tcG9uZW50LiQkLmN0eFtpbmRleF0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZV9jb21wb25lbnQoYmxvY2spIHtcbiAgICBibG9jayAmJiBibG9jay5jKCk7XG59XG5mdW5jdGlvbiBjbGFpbV9jb21wb25lbnQoYmxvY2ssIHBhcmVudF9ub2Rlcykge1xuICAgIGJsb2NrICYmIGJsb2NrLmwocGFyZW50X25vZGVzKTtcbn1cbmZ1bmN0aW9uIG1vdW50X2NvbXBvbmVudChjb21wb25lbnQsIHRhcmdldCwgYW5jaG9yKSB7XG4gICAgY29uc3QgeyBmcmFnbWVudCwgb25fbW91bnQsIG9uX2Rlc3Ryb3ksIGFmdGVyX3VwZGF0ZSB9ID0gY29tcG9uZW50LiQkO1xuICAgIGZyYWdtZW50ICYmIGZyYWdtZW50Lm0odGFyZ2V0LCBhbmNob3IpO1xuICAgIC8vIG9uTW91bnQgaGFwcGVucyBiZWZvcmUgdGhlIGluaXRpYWwgYWZ0ZXJVcGRhdGVcbiAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3X29uX2Rlc3Ryb3kgPSBvbl9tb3VudC5tYXAocnVuKS5maWx0ZXIoaXNfZnVuY3Rpb24pO1xuICAgICAgICBpZiAob25fZGVzdHJveSkge1xuICAgICAgICAgICAgb25fZGVzdHJveS5wdXNoKC4uLm5ld19vbl9kZXN0cm95KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIEVkZ2UgY2FzZSAtIGNvbXBvbmVudCB3YXMgZGVzdHJveWVkIGltbWVkaWF0ZWx5LFxuICAgICAgICAgICAgLy8gbW9zdCBsaWtlbHkgYXMgYSByZXN1bHQgb2YgYSBiaW5kaW5nIGluaXRpYWxpc2luZ1xuICAgICAgICAgICAgcnVuX2FsbChuZXdfb25fZGVzdHJveSk7XG4gICAgICAgIH1cbiAgICAgICAgY29tcG9uZW50LiQkLm9uX21vdW50ID0gW107XG4gICAgfSk7XG4gICAgYWZ0ZXJfdXBkYXRlLmZvckVhY2goYWRkX3JlbmRlcl9jYWxsYmFjayk7XG59XG5mdW5jdGlvbiBkZXN0cm95X2NvbXBvbmVudChjb21wb25lbnQsIGRldGFjaGluZykge1xuICAgIGNvbnN0ICQkID0gY29tcG9uZW50LiQkO1xuICAgIGlmICgkJC5mcmFnbWVudCAhPT0gbnVsbCkge1xuICAgICAgICBydW5fYWxsKCQkLm9uX2Rlc3Ryb3kpO1xuICAgICAgICAkJC5mcmFnbWVudCAmJiAkJC5mcmFnbWVudC5kKGRldGFjaGluZyk7XG4gICAgICAgIC8vIFRPRE8gbnVsbCBvdXQgb3RoZXIgcmVmcywgaW5jbHVkaW5nIGNvbXBvbmVudC4kJCAoYnV0IG5lZWQgdG9cbiAgICAgICAgLy8gcHJlc2VydmUgZmluYWwgc3RhdGU/KVxuICAgICAgICAkJC5vbl9kZXN0cm95ID0gJCQuZnJhZ21lbnQgPSBudWxsO1xuICAgICAgICAkJC5jdHggPSBbXTtcbiAgICB9XG59XG5mdW5jdGlvbiBtYWtlX2RpcnR5KGNvbXBvbmVudCwgaSkge1xuICAgIGlmIChjb21wb25lbnQuJCQuZGlydHlbMF0gPT09IC0xKSB7XG4gICAgICAgIGRpcnR5X2NvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuICAgICAgICBzY2hlZHVsZV91cGRhdGUoKTtcbiAgICAgICAgY29tcG9uZW50LiQkLmRpcnR5LmZpbGwoMCk7XG4gICAgfVxuICAgIGNvbXBvbmVudC4kJC5kaXJ0eVsoaSAvIDMxKSB8IDBdIHw9ICgxIDw8IChpICUgMzEpKTtcbn1cbmZ1bmN0aW9uIGluaXQoY29tcG9uZW50LCBvcHRpb25zLCBpbnN0YW5jZSwgY3JlYXRlX2ZyYWdtZW50LCBub3RfZXF1YWwsIHByb3BzLCBkaXJ0eSA9IFstMV0pIHtcbiAgICBjb25zdCBwYXJlbnRfY29tcG9uZW50ID0gY3VycmVudF9jb21wb25lbnQ7XG4gICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgY29uc3QgcHJvcF92YWx1ZXMgPSBvcHRpb25zLnByb3BzIHx8IHt9O1xuICAgIGNvbnN0ICQkID0gY29tcG9uZW50LiQkID0ge1xuICAgICAgICBmcmFnbWVudDogbnVsbCxcbiAgICAgICAgY3R4OiBudWxsLFxuICAgICAgICAvLyBzdGF0ZVxuICAgICAgICBwcm9wcyxcbiAgICAgICAgdXBkYXRlOiBub29wLFxuICAgICAgICBub3RfZXF1YWwsXG4gICAgICAgIGJvdW5kOiBibGFua19vYmplY3QoKSxcbiAgICAgICAgLy8gbGlmZWN5Y2xlXG4gICAgICAgIG9uX21vdW50OiBbXSxcbiAgICAgICAgb25fZGVzdHJveTogW10sXG4gICAgICAgIGJlZm9yZV91cGRhdGU6IFtdLFxuICAgICAgICBhZnRlcl91cGRhdGU6IFtdLFxuICAgICAgICBjb250ZXh0OiBuZXcgTWFwKHBhcmVudF9jb21wb25lbnQgPyBwYXJlbnRfY29tcG9uZW50LiQkLmNvbnRleHQgOiBbXSksXG4gICAgICAgIC8vIGV2ZXJ5dGhpbmcgZWxzZVxuICAgICAgICBjYWxsYmFja3M6IGJsYW5rX29iamVjdCgpLFxuICAgICAgICBkaXJ0eSxcbiAgICAgICAgc2tpcF9ib3VuZDogZmFsc2VcbiAgICB9O1xuICAgIGxldCByZWFkeSA9IGZhbHNlO1xuICAgICQkLmN0eCA9IGluc3RhbmNlXG4gICAgICAgID8gaW5zdGFuY2UoY29tcG9uZW50LCBwcm9wX3ZhbHVlcywgKGksIHJldCwgLi4ucmVzdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSByZXN0Lmxlbmd0aCA/IHJlc3RbMF0gOiByZXQ7XG4gICAgICAgICAgICBpZiAoJCQuY3R4ICYmIG5vdF9lcXVhbCgkJC5jdHhbaV0sICQkLmN0eFtpXSA9IHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICghJCQuc2tpcF9ib3VuZCAmJiAkJC5ib3VuZFtpXSlcbiAgICAgICAgICAgICAgICAgICAgJCQuYm91bmRbaV0odmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChyZWFkeSlcbiAgICAgICAgICAgICAgICAgICAgbWFrZV9kaXJ0eShjb21wb25lbnQsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSlcbiAgICAgICAgOiBbXTtcbiAgICAkJC51cGRhdGUoKTtcbiAgICByZWFkeSA9IHRydWU7XG4gICAgcnVuX2FsbCgkJC5iZWZvcmVfdXBkYXRlKTtcbiAgICAvLyBgZmFsc2VgIGFzIGEgc3BlY2lhbCBjYXNlIG9mIG5vIERPTSBjb21wb25lbnRcbiAgICAkJC5mcmFnbWVudCA9IGNyZWF0ZV9mcmFnbWVudCA/IGNyZWF0ZV9mcmFnbWVudCgkJC5jdHgpIDogZmFsc2U7XG4gICAgaWYgKG9wdGlvbnMudGFyZ2V0KSB7XG4gICAgICAgIGlmIChvcHRpb25zLmh5ZHJhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVzID0gY2hpbGRyZW4ob3B0aW9ucy50YXJnZXQpO1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50Lmwobm9kZXMpO1xuICAgICAgICAgICAgbm9kZXMuZm9yRWFjaChkZXRhY2gpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50LmMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5pbnRybylcbiAgICAgICAgICAgIHRyYW5zaXRpb25faW4oY29tcG9uZW50LiQkLmZyYWdtZW50KTtcbiAgICAgICAgbW91bnRfY29tcG9uZW50KGNvbXBvbmVudCwgb3B0aW9ucy50YXJnZXQsIG9wdGlvbnMuYW5jaG9yKTtcbiAgICAgICAgZmx1c2goKTtcbiAgICB9XG4gICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KHBhcmVudF9jb21wb25lbnQpO1xufVxubGV0IFN2ZWx0ZUVsZW1lbnQ7XG5pZiAodHlwZW9mIEhUTUxFbGVtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgU3ZlbHRlRWxlbWVudCA9IGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogaW1wcm92ZSB0eXBpbmdzXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLiQkLnNsb3R0ZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIHRvZG86IGltcHJvdmUgdHlwaW5nc1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy4kJC5zbG90dGVkW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyLCBfb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzW2F0dHJdID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgJGRlc3Ryb3koKSB7XG4gICAgICAgICAgICBkZXN0cm95X2NvbXBvbmVudCh0aGlzLCAxKTtcbiAgICAgICAgICAgIHRoaXMuJGRlc3Ryb3kgPSBub29wO1xuICAgICAgICB9XG4gICAgICAgICRvbih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgLy8gVE9ETyBzaG91bGQgdGhpcyBkZWxlZ2F0ZSB0byBhZGRFdmVudExpc3RlbmVyP1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdIHx8ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSA9IFtdKSk7XG4gICAgICAgICAgICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAkc2V0KCQkcHJvcHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLiQkc2V0ICYmICFpc19lbXB0eSgkJHByb3BzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJCQuc2tpcF9ib3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy4kJHNldCgkJHByb3BzKTtcbiAgICAgICAgICAgICAgICB0aGlzLiQkLnNraXBfYm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5jbGFzcyBTdmVsdGVDb21wb25lbnQge1xuICAgICRkZXN0cm95KCkge1xuICAgICAgICBkZXN0cm95X2NvbXBvbmVudCh0aGlzLCAxKTtcbiAgICAgICAgdGhpcy4kZGVzdHJveSA9IG5vb3A7XG4gICAgfVxuICAgICRvbih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCBjYWxsYmFja3MgPSAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gfHwgKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdID0gW10pKTtcbiAgICAgICAgY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBjYWxsYmFja3MuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAkc2V0KCQkcHJvcHMpIHtcbiAgICAgICAgaWYgKHRoaXMuJCRzZXQgJiYgIWlzX2VtcHR5KCQkcHJvcHMpKSB7XG4gICAgICAgICAgICB0aGlzLiQkLnNraXBfYm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kJHNldCgkJHByb3BzKTtcbiAgICAgICAgICAgIHRoaXMuJCQuc2tpcF9ib3VuZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaF9kZXYodHlwZSwgZGV0YWlsKSB7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjdXN0b21fZXZlbnQodHlwZSwgT2JqZWN0LmFzc2lnbih7IHZlcnNpb246ICczLjI5LjQnIH0sIGRldGFpbCkpKTtcbn1cbmZ1bmN0aW9uIGFwcGVuZF9kZXYodGFyZ2V0LCBub2RlKSB7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01JbnNlcnQnLCB7IHRhcmdldCwgbm9kZSB9KTtcbiAgICBhcHBlbmQodGFyZ2V0LCBub2RlKTtcbn1cbmZ1bmN0aW9uIGluc2VydF9kZXYodGFyZ2V0LCBub2RlLCBhbmNob3IpIHtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTUluc2VydCcsIHsgdGFyZ2V0LCBub2RlLCBhbmNob3IgfSk7XG4gICAgaW5zZXJ0KHRhcmdldCwgbm9kZSwgYW5jaG9yKTtcbn1cbmZ1bmN0aW9uIGRldGFjaF9kZXYobm9kZSkge1xuICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NUmVtb3ZlJywgeyBub2RlIH0pO1xuICAgIGRldGFjaChub2RlKTtcbn1cbmZ1bmN0aW9uIGRldGFjaF9iZXR3ZWVuX2RldihiZWZvcmUsIGFmdGVyKSB7XG4gICAgd2hpbGUgKGJlZm9yZS5uZXh0U2libGluZyAmJiBiZWZvcmUubmV4dFNpYmxpbmcgIT09IGFmdGVyKSB7XG4gICAgICAgIGRldGFjaF9kZXYoYmVmb3JlLm5leHRTaWJsaW5nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBkZXRhY2hfYmVmb3JlX2RldihhZnRlcikge1xuICAgIHdoaWxlIChhZnRlci5wcmV2aW91c1NpYmxpbmcpIHtcbiAgICAgICAgZGV0YWNoX2RldihhZnRlci5wcmV2aW91c1NpYmxpbmcpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRldGFjaF9hZnRlcl9kZXYoYmVmb3JlKSB7XG4gICAgd2hpbGUgKGJlZm9yZS5uZXh0U2libGluZykge1xuICAgICAgICBkZXRhY2hfZGV2KGJlZm9yZS5uZXh0U2libGluZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gbGlzdGVuX2Rldihub2RlLCBldmVudCwgaGFuZGxlciwgb3B0aW9ucywgaGFzX3ByZXZlbnRfZGVmYXVsdCwgaGFzX3N0b3BfcHJvcGFnYXRpb24pIHtcbiAgICBjb25zdCBtb2RpZmllcnMgPSBvcHRpb25zID09PSB0cnVlID8gWydjYXB0dXJlJ10gOiBvcHRpb25zID8gQXJyYXkuZnJvbShPYmplY3Qua2V5cyhvcHRpb25zKSkgOiBbXTtcbiAgICBpZiAoaGFzX3ByZXZlbnRfZGVmYXVsdClcbiAgICAgICAgbW9kaWZpZXJzLnB1c2goJ3ByZXZlbnREZWZhdWx0Jyk7XG4gICAgaWYgKGhhc19zdG9wX3Byb3BhZ2F0aW9uKVxuICAgICAgICBtb2RpZmllcnMucHVzaCgnc3RvcFByb3BhZ2F0aW9uJyk7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01BZGRFdmVudExpc3RlbmVyJywgeyBub2RlLCBldmVudCwgaGFuZGxlciwgbW9kaWZpZXJzIH0pO1xuICAgIGNvbnN0IGRpc3Bvc2UgPSBsaXN0ZW4obm9kZSwgZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NUmVtb3ZlRXZlbnRMaXN0ZW5lcicsIHsgbm9kZSwgZXZlbnQsIGhhbmRsZXIsIG1vZGlmaWVycyB9KTtcbiAgICAgICAgZGlzcG9zZSgpO1xuICAgIH07XG59XG5mdW5jdGlvbiBhdHRyX2Rldihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01SZW1vdmVBdHRyaWJ1dGUnLCB7IG5vZGUsIGF0dHJpYnV0ZSB9KTtcbiAgICBlbHNlXG4gICAgICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NU2V0QXR0cmlidXRlJywgeyBub2RlLCBhdHRyaWJ1dGUsIHZhbHVlIH0pO1xufVxuZnVuY3Rpb24gcHJvcF9kZXYobm9kZSwgcHJvcGVydHksIHZhbHVlKSB7XG4gICAgbm9kZVtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTVNldFByb3BlcnR5JywgeyBub2RlLCBwcm9wZXJ0eSwgdmFsdWUgfSk7XG59XG5mdW5jdGlvbiBkYXRhc2V0X2Rldihub2RlLCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICBub2RlLmRhdGFzZXRbcHJvcGVydHldID0gdmFsdWU7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01TZXREYXRhc2V0JywgeyBub2RlLCBwcm9wZXJ0eSwgdmFsdWUgfSk7XG59XG5mdW5jdGlvbiBzZXRfZGF0YV9kZXYodGV4dCwgZGF0YSkge1xuICAgIGRhdGEgPSAnJyArIGRhdGE7XG4gICAgaWYgKHRleHQud2hvbGVUZXh0ID09PSBkYXRhKVxuICAgICAgICByZXR1cm47XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01TZXREYXRhJywgeyBub2RlOiB0ZXh0LCBkYXRhIH0pO1xuICAgIHRleHQuZGF0YSA9IGRhdGE7XG59XG5mdW5jdGlvbiB2YWxpZGF0ZV9lYWNoX2FyZ3VtZW50KGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnc3RyaW5nJyAmJiAhKGFyZyAmJiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiAnbGVuZ3RoJyBpbiBhcmcpKSB7XG4gICAgICAgIGxldCBtc2cgPSAneyNlYWNofSBvbmx5IGl0ZXJhdGVzIG92ZXIgYXJyYXktbGlrZSBvYmplY3RzLic7XG4gICAgICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIGFyZyAmJiBTeW1ib2wuaXRlcmF0b3IgaW4gYXJnKSB7XG4gICAgICAgICAgICBtc2cgKz0gJyBZb3UgY2FuIHVzZSBhIHNwcmVhZCB0byBjb252ZXJ0IHRoaXMgaXRlcmFibGUgaW50byBhbiBhcnJheS4nO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHZhbGlkYXRlX3Nsb3RzKG5hbWUsIHNsb3QsIGtleXMpIHtcbiAgICBmb3IgKGNvbnN0IHNsb3Rfa2V5IG9mIE9iamVjdC5rZXlzKHNsb3QpKSB7XG4gICAgICAgIGlmICghfmtleXMuaW5kZXhPZihzbG90X2tleSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgPCR7bmFtZX0+IHJlY2VpdmVkIGFuIHVuZXhwZWN0ZWQgc2xvdCBcIiR7c2xvdF9rZXl9XCIuYCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5jbGFzcyBTdmVsdGVDb21wb25lbnREZXYgZXh0ZW5kcyBTdmVsdGVDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zIHx8ICghb3B0aW9ucy50YXJnZXQgJiYgIW9wdGlvbnMuJCRpbmxpbmUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCIndGFyZ2V0JyBpcyBhIHJlcXVpcmVkIG9wdGlvblwiKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlcigpO1xuICAgIH1cbiAgICAkZGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIuJGRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy4kZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignQ29tcG9uZW50IHdhcyBhbHJlYWR5IGRlc3Ryb3llZCcpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgfTtcbiAgICB9XG4gICAgJGNhcHR1cmVfc3RhdGUoKSB7IH1cbiAgICAkaW5qZWN0X3N0YXRlKCkgeyB9XG59XG5mdW5jdGlvbiBsb29wX2d1YXJkKHRpbWVvdXQpIHtcbiAgICBjb25zdCBzdGFydCA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKERhdGUubm93KCkgLSBzdGFydCA+IHRpbWVvdXQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW5maW5pdGUgbG9vcCBkZXRlY3RlZCcpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IHsgSHRtbFRhZywgU3ZlbHRlQ29tcG9uZW50LCBTdmVsdGVDb21wb25lbnREZXYsIFN2ZWx0ZUVsZW1lbnQsIGFjdGlvbl9kZXN0cm95ZXIsIGFkZF9hdHRyaWJ1dGUsIGFkZF9jbGFzc2VzLCBhZGRfZmx1c2hfY2FsbGJhY2ssIGFkZF9sb2NhdGlvbiwgYWRkX3JlbmRlcl9jYWxsYmFjaywgYWRkX3Jlc2l6ZV9saXN0ZW5lciwgYWRkX3RyYW5zZm9ybSwgYWZ0ZXJVcGRhdGUsIGFwcGVuZCwgYXBwZW5kX2RldiwgYXNzaWduLCBhdHRyLCBhdHRyX2RldiwgYmVmb3JlVXBkYXRlLCBiaW5kLCBiaW5kaW5nX2NhbGxiYWNrcywgYmxhbmtfb2JqZWN0LCBidWJibGUsIGNoZWNrX291dHJvcywgY2hpbGRyZW4sIGNsYWltX2NvbXBvbmVudCwgY2xhaW1fZWxlbWVudCwgY2xhaW1fc3BhY2UsIGNsYWltX3RleHQsIGNsZWFyX2xvb3BzLCBjb21wb25lbnRfc3Vic2NyaWJlLCBjb21wdXRlX3Jlc3RfcHJvcHMsIGNvbXB1dGVfc2xvdHMsIGNyZWF0ZUV2ZW50RGlzcGF0Y2hlciwgY3JlYXRlX2FuaW1hdGlvbiwgY3JlYXRlX2JpZGlyZWN0aW9uYWxfdHJhbnNpdGlvbiwgY3JlYXRlX2NvbXBvbmVudCwgY3JlYXRlX2luX3RyYW5zaXRpb24sIGNyZWF0ZV9vdXRfdHJhbnNpdGlvbiwgY3JlYXRlX3Nsb3QsIGNyZWF0ZV9zc3JfY29tcG9uZW50LCBjdXJyZW50X2NvbXBvbmVudCwgY3VzdG9tX2V2ZW50LCBkYXRhc2V0X2RldiwgZGVidWcsIGRlc3Ryb3lfYmxvY2ssIGRlc3Ryb3lfY29tcG9uZW50LCBkZXN0cm95X2VhY2gsIGRldGFjaCwgZGV0YWNoX2FmdGVyX2RldiwgZGV0YWNoX2JlZm9yZV9kZXYsIGRldGFjaF9iZXR3ZWVuX2RldiwgZGV0YWNoX2RldiwgZGlydHlfY29tcG9uZW50cywgZGlzcGF0Y2hfZGV2LCBlYWNoLCBlbGVtZW50LCBlbGVtZW50X2lzLCBlbXB0eSwgZXNjYXBlLCBlc2NhcGVkLCBleGNsdWRlX2ludGVybmFsX3Byb3BzLCBmaXhfYW5kX2Rlc3Ryb3lfYmxvY2ssIGZpeF9hbmRfb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2ssIGZpeF9wb3NpdGlvbiwgZmx1c2gsIGdldENvbnRleHQsIGdldF9iaW5kaW5nX2dyb3VwX3ZhbHVlLCBnZXRfY3VycmVudF9jb21wb25lbnQsIGdldF9zbG90X2NoYW5nZXMsIGdldF9zbG90X2NvbnRleHQsIGdldF9zcHJlYWRfb2JqZWN0LCBnZXRfc3ByZWFkX3VwZGF0ZSwgZ2V0X3N0b3JlX3ZhbHVlLCBnbG9iYWxzLCBncm91cF9vdXRyb3MsIGhhbmRsZV9wcm9taXNlLCBoYXNfcHJvcCwgaWRlbnRpdHksIGluaXQsIGluc2VydCwgaW5zZXJ0X2RldiwgaW50cm9zLCBpbnZhbGlkX2F0dHJpYnV0ZV9uYW1lX2NoYXJhY3RlciwgaXNfY2xpZW50LCBpc19jcm9zc29yaWdpbiwgaXNfZW1wdHksIGlzX2Z1bmN0aW9uLCBpc19wcm9taXNlLCBsaXN0ZW4sIGxpc3Rlbl9kZXYsIGxvb3AsIGxvb3BfZ3VhcmQsIG1pc3NpbmdfY29tcG9uZW50LCBtb3VudF9jb21wb25lbnQsIG5vb3AsIG5vdF9lcXVhbCwgbm93LCBudWxsX3RvX2VtcHR5LCBvYmplY3Rfd2l0aG91dF9wcm9wZXJ0aWVzLCBvbkRlc3Ryb3ksIG9uTW91bnQsIG9uY2UsIG91dHJvX2FuZF9kZXN0cm95X2Jsb2NrLCBwcmV2ZW50X2RlZmF1bHQsIHByb3BfZGV2LCBxdWVyeV9zZWxlY3Rvcl9hbGwsIHJhZiwgcnVuLCBydW5fYWxsLCBzYWZlX25vdF9lcXVhbCwgc2NoZWR1bGVfdXBkYXRlLCBzZWxlY3RfbXVsdGlwbGVfdmFsdWUsIHNlbGVjdF9vcHRpb24sIHNlbGVjdF9vcHRpb25zLCBzZWxlY3RfdmFsdWUsIHNlbGYsIHNldENvbnRleHQsIHNldF9hdHRyaWJ1dGVzLCBzZXRfY3VycmVudF9jb21wb25lbnQsIHNldF9jdXN0b21fZWxlbWVudF9kYXRhLCBzZXRfZGF0YSwgc2V0X2RhdGFfZGV2LCBzZXRfaW5wdXRfdHlwZSwgc2V0X2lucHV0X3ZhbHVlLCBzZXRfbm93LCBzZXRfcmFmLCBzZXRfc3RvcmVfdmFsdWUsIHNldF9zdHlsZSwgc2V0X3N2Z19hdHRyaWJ1dGVzLCBzcGFjZSwgc3ByZWFkLCBzdG9wX3Byb3BhZ2F0aW9uLCBzdWJzY3JpYmUsIHN2Z19lbGVtZW50LCB0ZXh0LCB0aWNrLCB0aW1lX3Jhbmdlc190b19hcnJheSwgdG9fbnVtYmVyLCB0b2dnbGVfY2xhc3MsIHRyYW5zaXRpb25faW4sIHRyYW5zaXRpb25fb3V0LCB1cGRhdGVfa2V5ZWRfZWFjaCwgdXBkYXRlX3Nsb3QsIHZhbGlkYXRlX2NvbXBvbmVudCwgdmFsaWRhdGVfZWFjaF9hcmd1bWVudCwgdmFsaWRhdGVfZWFjaF9rZXlzLCB2YWxpZGF0ZV9zbG90cywgdmFsaWRhdGVfc3RvcmUsIHhsaW5rX2F0dHIgfTtcbiIsImltcG9ydCB7IG5vb3AsIHNhZmVfbm90X2VxdWFsLCBzdWJzY3JpYmUsIHJ1bl9hbGwsIGlzX2Z1bmN0aW9uIH0gZnJvbSAnLi4vaW50ZXJuYWwnO1xuZXhwb3J0IHsgZ2V0X3N0b3JlX3ZhbHVlIGFzIGdldCB9IGZyb20gJy4uL2ludGVybmFsJztcblxuY29uc3Qgc3Vic2NyaWJlcl9xdWV1ZSA9IFtdO1xuLyoqXG4gKiBDcmVhdGVzIGEgYFJlYWRhYmxlYCBzdG9yZSB0aGF0IGFsbG93cyByZWFkaW5nIGJ5IHN1YnNjcmlwdGlvbi5cbiAqIEBwYXJhbSB2YWx1ZSBpbml0aWFsIHZhbHVlXG4gKiBAcGFyYW0ge1N0YXJ0U3RvcE5vdGlmaWVyfXN0YXJ0IHN0YXJ0IGFuZCBzdG9wIG5vdGlmaWNhdGlvbnMgZm9yIHN1YnNjcmlwdGlvbnNcbiAqL1xuZnVuY3Rpb24gcmVhZGFibGUodmFsdWUsIHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3Vic2NyaWJlOiB3cml0YWJsZSh2YWx1ZSwgc3RhcnQpLnN1YnNjcmliZVxuICAgIH07XG59XG4vKipcbiAqIENyZWF0ZSBhIGBXcml0YWJsZWAgc3RvcmUgdGhhdCBhbGxvd3MgYm90aCB1cGRhdGluZyBhbmQgcmVhZGluZyBieSBzdWJzY3JpcHRpb24uXG4gKiBAcGFyYW0geyo9fXZhbHVlIGluaXRpYWwgdmFsdWVcbiAqIEBwYXJhbSB7U3RhcnRTdG9wTm90aWZpZXI9fXN0YXJ0IHN0YXJ0IGFuZCBzdG9wIG5vdGlmaWNhdGlvbnMgZm9yIHN1YnNjcmlwdGlvbnNcbiAqL1xuZnVuY3Rpb24gd3JpdGFibGUodmFsdWUsIHN0YXJ0ID0gbm9vcCkge1xuICAgIGxldCBzdG9wO1xuICAgIGNvbnN0IHN1YnNjcmliZXJzID0gW107XG4gICAgZnVuY3Rpb24gc2V0KG5ld192YWx1ZSkge1xuICAgICAgICBpZiAoc2FmZV9ub3RfZXF1YWwodmFsdWUsIG5ld192YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gbmV3X3ZhbHVlO1xuICAgICAgICAgICAgaWYgKHN0b3ApIHsgLy8gc3RvcmUgaXMgcmVhZHlcbiAgICAgICAgICAgICAgICBjb25zdCBydW5fcXVldWUgPSAhc3Vic2NyaWJlcl9xdWV1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJzY3JpYmVycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzID0gc3Vic2NyaWJlcnNbaV07XG4gICAgICAgICAgICAgICAgICAgIHNbMV0oKTtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlcl9xdWV1ZS5wdXNoKHMsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJ1bl9xdWV1ZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YnNjcmliZXJfcXVldWUubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXJfcXVldWVbaV1bMF0oc3Vic2NyaWJlcl9xdWV1ZVtpICsgMV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXJfcXVldWUubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlKGZuKSB7XG4gICAgICAgIHNldChmbih2YWx1ZSkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzdWJzY3JpYmUocnVuLCBpbnZhbGlkYXRlID0gbm9vcCkge1xuICAgICAgICBjb25zdCBzdWJzY3JpYmVyID0gW3J1biwgaW52YWxpZGF0ZV07XG4gICAgICAgIHN1YnNjcmliZXJzLnB1c2goc3Vic2NyaWJlcik7XG4gICAgICAgIGlmIChzdWJzY3JpYmVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHN0b3AgPSBzdGFydChzZXQpIHx8IG5vb3A7XG4gICAgICAgIH1cbiAgICAgICAgcnVuKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc3Vic2NyaWJlcnMuaW5kZXhPZihzdWJzY3JpYmVyKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN1YnNjcmliZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHN0b3AoKTtcbiAgICAgICAgICAgICAgICBzdG9wID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgc2V0LCB1cGRhdGUsIHN1YnNjcmliZSB9O1xufVxuZnVuY3Rpb24gZGVyaXZlZChzdG9yZXMsIGZuLCBpbml0aWFsX3ZhbHVlKSB7XG4gICAgY29uc3Qgc2luZ2xlID0gIUFycmF5LmlzQXJyYXkoc3RvcmVzKTtcbiAgICBjb25zdCBzdG9yZXNfYXJyYXkgPSBzaW5nbGVcbiAgICAgICAgPyBbc3RvcmVzXVxuICAgICAgICA6IHN0b3JlcztcbiAgICBjb25zdCBhdXRvID0gZm4ubGVuZ3RoIDwgMjtcbiAgICByZXR1cm4gcmVhZGFibGUoaW5pdGlhbF92YWx1ZSwgKHNldCkgPT4ge1xuICAgICAgICBsZXQgaW5pdGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgICAgICBsZXQgcGVuZGluZyA9IDA7XG4gICAgICAgIGxldCBjbGVhbnVwID0gbm9vcDtcbiAgICAgICAgY29uc3Qgc3luYyA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmIChwZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZm4oc2luZ2xlID8gdmFsdWVzWzBdIDogdmFsdWVzLCBzZXQpO1xuICAgICAgICAgICAgaWYgKGF1dG8pIHtcbiAgICAgICAgICAgICAgICBzZXQocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNsZWFudXAgPSBpc19mdW5jdGlvbihyZXN1bHQpID8gcmVzdWx0IDogbm9vcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdW5zdWJzY3JpYmVycyA9IHN0b3Jlc19hcnJheS5tYXAoKHN0b3JlLCBpKSA9PiBzdWJzY3JpYmUoc3RvcmUsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdmFsdWVzW2ldID0gdmFsdWU7XG4gICAgICAgICAgICBwZW5kaW5nICY9IH4oMSA8PCBpKTtcbiAgICAgICAgICAgIGlmIChpbml0ZWQpIHtcbiAgICAgICAgICAgICAgICBzeW5jKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHBlbmRpbmcgfD0gKDEgPDwgaSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgaW5pdGVkID0gdHJ1ZTtcbiAgICAgICAgc3luYygpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgICAgIHJ1bl9hbGwodW5zdWJzY3JpYmVycyk7XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgIH07XG4gICAgfSk7XG59XG5cbmV4cG9ydCB7IGRlcml2ZWQsIHJlYWRhYmxlLCB3cml0YWJsZSB9O1xuIiwiaW1wb3J0IHsgd3JpdGFibGUgfSBmcm9tICdzdmVsdGUvc3RvcmUnO1xuXG5leHBvcnQgY29uc3QgQ09OVEVYVF9LRVkgPSB7fTtcblxuZXhwb3J0IGNvbnN0IHByZWxvYWQgPSAoKSA9PiAoe30pOyIsImV4cG9ydCB7IGlkZW50aXR5IGFzIGxpbmVhciB9IGZyb20gJy4uL2ludGVybmFsJztcblxuLypcbkFkYXB0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vbWF0dGRlc2xcbkRpc3RyaWJ1dGVkIHVuZGVyIE1JVCBMaWNlbnNlIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXR0ZGVzbC9lYXNlcy9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4qL1xuZnVuY3Rpb24gYmFja0luT3V0KHQpIHtcbiAgICBjb25zdCBzID0gMS43MDE1OCAqIDEuNTI1O1xuICAgIGlmICgodCAqPSAyKSA8IDEpXG4gICAgICAgIHJldHVybiAwLjUgKiAodCAqIHQgKiAoKHMgKyAxKSAqIHQgLSBzKSk7XG4gICAgcmV0dXJuIDAuNSAqICgodCAtPSAyKSAqIHQgKiAoKHMgKyAxKSAqIHQgKyBzKSArIDIpO1xufVxuZnVuY3Rpb24gYmFja0luKHQpIHtcbiAgICBjb25zdCBzID0gMS43MDE1ODtcbiAgICByZXR1cm4gdCAqIHQgKiAoKHMgKyAxKSAqIHQgLSBzKTtcbn1cbmZ1bmN0aW9uIGJhY2tPdXQodCkge1xuICAgIGNvbnN0IHMgPSAxLjcwMTU4O1xuICAgIHJldHVybiAtLXQgKiB0ICogKChzICsgMSkgKiB0ICsgcykgKyAxO1xufVxuZnVuY3Rpb24gYm91bmNlT3V0KHQpIHtcbiAgICBjb25zdCBhID0gNC4wIC8gMTEuMDtcbiAgICBjb25zdCBiID0gOC4wIC8gMTEuMDtcbiAgICBjb25zdCBjID0gOS4wIC8gMTAuMDtcbiAgICBjb25zdCBjYSA9IDQzNTYuMCAvIDM2MS4wO1xuICAgIGNvbnN0IGNiID0gMzU0NDIuMCAvIDE4MDUuMDtcbiAgICBjb25zdCBjYyA9IDE2MDYxLjAgLyAxODA1LjA7XG4gICAgY29uc3QgdDIgPSB0ICogdDtcbiAgICByZXR1cm4gdCA8IGFcbiAgICAgICAgPyA3LjU2MjUgKiB0MlxuICAgICAgICA6IHQgPCBiXG4gICAgICAgICAgICA/IDkuMDc1ICogdDIgLSA5LjkgKiB0ICsgMy40XG4gICAgICAgICAgICA6IHQgPCBjXG4gICAgICAgICAgICAgICAgPyBjYSAqIHQyIC0gY2IgKiB0ICsgY2NcbiAgICAgICAgICAgICAgICA6IDEwLjggKiB0ICogdCAtIDIwLjUyICogdCArIDEwLjcyO1xufVxuZnVuY3Rpb24gYm91bmNlSW5PdXQodCkge1xuICAgIHJldHVybiB0IDwgMC41XG4gICAgICAgID8gMC41ICogKDEuMCAtIGJvdW5jZU91dCgxLjAgLSB0ICogMi4wKSlcbiAgICAgICAgOiAwLjUgKiBib3VuY2VPdXQodCAqIDIuMCAtIDEuMCkgKyAwLjU7XG59XG5mdW5jdGlvbiBib3VuY2VJbih0KSB7XG4gICAgcmV0dXJuIDEuMCAtIGJvdW5jZU91dCgxLjAgLSB0KTtcbn1cbmZ1bmN0aW9uIGNpcmNJbk91dCh0KSB7XG4gICAgaWYgKCh0ICo9IDIpIDwgMSlcbiAgICAgICAgcmV0dXJuIC0wLjUgKiAoTWF0aC5zcXJ0KDEgLSB0ICogdCkgLSAxKTtcbiAgICByZXR1cm4gMC41ICogKE1hdGguc3FydCgxIC0gKHQgLT0gMikgKiB0KSArIDEpO1xufVxuZnVuY3Rpb24gY2lyY0luKHQpIHtcbiAgICByZXR1cm4gMS4wIC0gTWF0aC5zcXJ0KDEuMCAtIHQgKiB0KTtcbn1cbmZ1bmN0aW9uIGNpcmNPdXQodCkge1xuICAgIHJldHVybiBNYXRoLnNxcnQoMSAtIC0tdCAqIHQpO1xufVxuZnVuY3Rpb24gY3ViaWNJbk91dCh0KSB7XG4gICAgcmV0dXJuIHQgPCAwLjUgPyA0LjAgKiB0ICogdCAqIHQgOiAwLjUgKiBNYXRoLnBvdygyLjAgKiB0IC0gMi4wLCAzLjApICsgMS4wO1xufVxuZnVuY3Rpb24gY3ViaWNJbih0KSB7XG4gICAgcmV0dXJuIHQgKiB0ICogdDtcbn1cbmZ1bmN0aW9uIGN1YmljT3V0KHQpIHtcbiAgICBjb25zdCBmID0gdCAtIDEuMDtcbiAgICByZXR1cm4gZiAqIGYgKiBmICsgMS4wO1xufVxuZnVuY3Rpb24gZWxhc3RpY0luT3V0KHQpIHtcbiAgICByZXR1cm4gdCA8IDAuNVxuICAgICAgICA/IDAuNSAqXG4gICAgICAgICAgICBNYXRoLnNpbigoKCsxMy4wICogTWF0aC5QSSkgLyAyKSAqIDIuMCAqIHQpICpcbiAgICAgICAgICAgIE1hdGgucG93KDIuMCwgMTAuMCAqICgyLjAgKiB0IC0gMS4wKSlcbiAgICAgICAgOiAwLjUgKlxuICAgICAgICAgICAgTWF0aC5zaW4oKCgtMTMuMCAqIE1hdGguUEkpIC8gMikgKiAoMi4wICogdCAtIDEuMCArIDEuMCkpICpcbiAgICAgICAgICAgIE1hdGgucG93KDIuMCwgLTEwLjAgKiAoMi4wICogdCAtIDEuMCkpICtcbiAgICAgICAgICAgIDEuMDtcbn1cbmZ1bmN0aW9uIGVsYXN0aWNJbih0KSB7XG4gICAgcmV0dXJuIE1hdGguc2luKCgxMy4wICogdCAqIE1hdGguUEkpIC8gMikgKiBNYXRoLnBvdygyLjAsIDEwLjAgKiAodCAtIDEuMCkpO1xufVxuZnVuY3Rpb24gZWxhc3RpY091dCh0KSB7XG4gICAgcmV0dXJuIChNYXRoLnNpbigoLTEzLjAgKiAodCArIDEuMCkgKiBNYXRoLlBJKSAvIDIpICogTWF0aC5wb3coMi4wLCAtMTAuMCAqIHQpICsgMS4wKTtcbn1cbmZ1bmN0aW9uIGV4cG9Jbk91dCh0KSB7XG4gICAgcmV0dXJuIHQgPT09IDAuMCB8fCB0ID09PSAxLjBcbiAgICAgICAgPyB0XG4gICAgICAgIDogdCA8IDAuNVxuICAgICAgICAgICAgPyArMC41ICogTWF0aC5wb3coMi4wLCAyMC4wICogdCAtIDEwLjApXG4gICAgICAgICAgICA6IC0wLjUgKiBNYXRoLnBvdygyLjAsIDEwLjAgLSB0ICogMjAuMCkgKyAxLjA7XG59XG5mdW5jdGlvbiBleHBvSW4odCkge1xuICAgIHJldHVybiB0ID09PSAwLjAgPyB0IDogTWF0aC5wb3coMi4wLCAxMC4wICogKHQgLSAxLjApKTtcbn1cbmZ1bmN0aW9uIGV4cG9PdXQodCkge1xuICAgIHJldHVybiB0ID09PSAxLjAgPyB0IDogMS4wIC0gTWF0aC5wb3coMi4wLCAtMTAuMCAqIHQpO1xufVxuZnVuY3Rpb24gcXVhZEluT3V0KHQpIHtcbiAgICB0IC89IDAuNTtcbiAgICBpZiAodCA8IDEpXG4gICAgICAgIHJldHVybiAwLjUgKiB0ICogdDtcbiAgICB0LS07XG4gICAgcmV0dXJuIC0wLjUgKiAodCAqICh0IC0gMikgLSAxKTtcbn1cbmZ1bmN0aW9uIHF1YWRJbih0KSB7XG4gICAgcmV0dXJuIHQgKiB0O1xufVxuZnVuY3Rpb24gcXVhZE91dCh0KSB7XG4gICAgcmV0dXJuIC10ICogKHQgLSAyLjApO1xufVxuZnVuY3Rpb24gcXVhcnRJbk91dCh0KSB7XG4gICAgcmV0dXJuIHQgPCAwLjVcbiAgICAgICAgPyArOC4wICogTWF0aC5wb3codCwgNC4wKVxuICAgICAgICA6IC04LjAgKiBNYXRoLnBvdyh0IC0gMS4wLCA0LjApICsgMS4wO1xufVxuZnVuY3Rpb24gcXVhcnRJbih0KSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHQsIDQuMCk7XG59XG5mdW5jdGlvbiBxdWFydE91dCh0KSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHQgLSAxLjAsIDMuMCkgKiAoMS4wIC0gdCkgKyAxLjA7XG59XG5mdW5jdGlvbiBxdWludEluT3V0KHQpIHtcbiAgICBpZiAoKHQgKj0gMikgPCAxKVxuICAgICAgICByZXR1cm4gMC41ICogdCAqIHQgKiB0ICogdCAqIHQ7XG4gICAgcmV0dXJuIDAuNSAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAqIHQgKyAyKTtcbn1cbmZ1bmN0aW9uIHF1aW50SW4odCkge1xuICAgIHJldHVybiB0ICogdCAqIHQgKiB0ICogdDtcbn1cbmZ1bmN0aW9uIHF1aW50T3V0KHQpIHtcbiAgICByZXR1cm4gLS10ICogdCAqIHQgKiB0ICogdCArIDE7XG59XG5mdW5jdGlvbiBzaW5lSW5PdXQodCkge1xuICAgIHJldHVybiAtMC41ICogKE1hdGguY29zKE1hdGguUEkgKiB0KSAtIDEpO1xufVxuZnVuY3Rpb24gc2luZUluKHQpIHtcbiAgICBjb25zdCB2ID0gTWF0aC5jb3ModCAqIE1hdGguUEkgKiAwLjUpO1xuICAgIGlmIChNYXRoLmFicyh2KSA8IDFlLTE0KVxuICAgICAgICByZXR1cm4gMTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiAxIC0gdjtcbn1cbmZ1bmN0aW9uIHNpbmVPdXQodCkge1xuICAgIHJldHVybiBNYXRoLnNpbigodCAqIE1hdGguUEkpIC8gMik7XG59XG5cbmV4cG9ydCB7IGJhY2tJbiwgYmFja0luT3V0LCBiYWNrT3V0LCBib3VuY2VJbiwgYm91bmNlSW5PdXQsIGJvdW5jZU91dCwgY2lyY0luLCBjaXJjSW5PdXQsIGNpcmNPdXQsIGN1YmljSW4sIGN1YmljSW5PdXQsIGN1YmljT3V0LCBlbGFzdGljSW4sIGVsYXN0aWNJbk91dCwgZWxhc3RpY091dCwgZXhwb0luLCBleHBvSW5PdXQsIGV4cG9PdXQsIHF1YWRJbiwgcXVhZEluT3V0LCBxdWFkT3V0LCBxdWFydEluLCBxdWFydEluT3V0LCBxdWFydE91dCwgcXVpbnRJbiwgcXVpbnRJbk91dCwgcXVpbnRPdXQsIHNpbmVJbiwgc2luZUluT3V0LCBzaW5lT3V0IH07XG4iLCJpbXBvcnQgeyBjdWJpY0luT3V0LCBsaW5lYXIsIGN1YmljT3V0IH0gZnJvbSAnLi4vZWFzaW5nJztcbmltcG9ydCB7IGlzX2Z1bmN0aW9uLCBhc3NpZ24gfSBmcm9tICcuLi9pbnRlcm5hbCc7XG5cbi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG5mdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cblxuZnVuY3Rpb24gYmx1cihub2RlLCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSA0MDAsIGVhc2luZyA9IGN1YmljSW5PdXQsIGFtb3VudCA9IDUsIG9wYWNpdHkgPSAwIH0pIHtcbiAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgY29uc3QgdGFyZ2V0X29wYWNpdHkgPSArc3R5bGUub3BhY2l0eTtcbiAgICBjb25zdCBmID0gc3R5bGUuZmlsdGVyID09PSAnbm9uZScgPyAnJyA6IHN0eWxlLmZpbHRlcjtcbiAgICBjb25zdCBvZCA9IHRhcmdldF9vcGFjaXR5ICogKDEgLSBvcGFjaXR5KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBkZWxheSxcbiAgICAgICAgZHVyYXRpb24sXG4gICAgICAgIGVhc2luZyxcbiAgICAgICAgY3NzOiAoX3QsIHUpID0+IGBvcGFjaXR5OiAke3RhcmdldF9vcGFjaXR5IC0gKG9kICogdSl9OyBmaWx0ZXI6ICR7Zn0gYmx1cigke3UgKiBhbW91bnR9cHgpO2BcbiAgICB9O1xufVxuZnVuY3Rpb24gZmFkZShub2RlLCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSA0MDAsIGVhc2luZyA9IGxpbmVhciB9KSB7XG4gICAgY29uc3QgbyA9ICtnZXRDb21wdXRlZFN0eWxlKG5vZGUpLm9wYWNpdHk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVsYXksXG4gICAgICAgIGR1cmF0aW9uLFxuICAgICAgICBlYXNpbmcsXG4gICAgICAgIGNzczogdCA9PiBgb3BhY2l0eTogJHt0ICogb31gXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGZseShub2RlLCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSA0MDAsIGVhc2luZyA9IGN1YmljT3V0LCB4ID0gMCwgeSA9IDAsIG9wYWNpdHkgPSAwIH0pIHtcbiAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgY29uc3QgdGFyZ2V0X29wYWNpdHkgPSArc3R5bGUub3BhY2l0eTtcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBzdHlsZS50cmFuc2Zvcm0gPT09ICdub25lJyA/ICcnIDogc3R5bGUudHJhbnNmb3JtO1xuICAgIGNvbnN0IG9kID0gdGFyZ2V0X29wYWNpdHkgKiAoMSAtIG9wYWNpdHkpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGRlbGF5LFxuICAgICAgICBkdXJhdGlvbixcbiAgICAgICAgZWFzaW5nLFxuICAgICAgICBjc3M6ICh0LCB1KSA9PiBgXG5cdFx0XHR0cmFuc2Zvcm06ICR7dHJhbnNmb3JtfSB0cmFuc2xhdGUoJHsoMSAtIHQpICogeH1weCwgJHsoMSAtIHQpICogeX1weCk7XG5cdFx0XHRvcGFjaXR5OiAke3RhcmdldF9vcGFjaXR5IC0gKG9kICogdSl9YFxuICAgIH07XG59XG5mdW5jdGlvbiBzbGlkZShub2RlLCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSA0MDAsIGVhc2luZyA9IGN1YmljT3V0IH0pIHtcbiAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgY29uc3Qgb3BhY2l0eSA9ICtzdHlsZS5vcGFjaXR5O1xuICAgIGNvbnN0IGhlaWdodCA9IHBhcnNlRmxvYXQoc3R5bGUuaGVpZ2h0KTtcbiAgICBjb25zdCBwYWRkaW5nX3RvcCA9IHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ1RvcCk7XG4gICAgY29uc3QgcGFkZGluZ19ib3R0b20gPSBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdCb3R0b20pO1xuICAgIGNvbnN0IG1hcmdpbl90b3AgPSBwYXJzZUZsb2F0KHN0eWxlLm1hcmdpblRvcCk7XG4gICAgY29uc3QgbWFyZ2luX2JvdHRvbSA9IHBhcnNlRmxvYXQoc3R5bGUubWFyZ2luQm90dG9tKTtcbiAgICBjb25zdCBib3JkZXJfdG9wX3dpZHRoID0gcGFyc2VGbG9hdChzdHlsZS5ib3JkZXJUb3BXaWR0aCk7XG4gICAgY29uc3QgYm9yZGVyX2JvdHRvbV93aWR0aCA9IHBhcnNlRmxvYXQoc3R5bGUuYm9yZGVyQm90dG9tV2lkdGgpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGRlbGF5LFxuICAgICAgICBkdXJhdGlvbixcbiAgICAgICAgZWFzaW5nLFxuICAgICAgICBjc3M6IHQgPT4gJ292ZXJmbG93OiBoaWRkZW47JyArXG4gICAgICAgICAgICBgb3BhY2l0eTogJHtNYXRoLm1pbih0ICogMjAsIDEpICogb3BhY2l0eX07YCArXG4gICAgICAgICAgICBgaGVpZ2h0OiAke3QgKiBoZWlnaHR9cHg7YCArXG4gICAgICAgICAgICBgcGFkZGluZy10b3A6ICR7dCAqIHBhZGRpbmdfdG9wfXB4O2AgK1xuICAgICAgICAgICAgYHBhZGRpbmctYm90dG9tOiAke3QgKiBwYWRkaW5nX2JvdHRvbX1weDtgICtcbiAgICAgICAgICAgIGBtYXJnaW4tdG9wOiAke3QgKiBtYXJnaW5fdG9wfXB4O2AgK1xuICAgICAgICAgICAgYG1hcmdpbi1ib3R0b206ICR7dCAqIG1hcmdpbl9ib3R0b219cHg7YCArXG4gICAgICAgICAgICBgYm9yZGVyLXRvcC13aWR0aDogJHt0ICogYm9yZGVyX3RvcF93aWR0aH1weDtgICtcbiAgICAgICAgICAgIGBib3JkZXItYm90dG9tLXdpZHRoOiAke3QgKiBib3JkZXJfYm90dG9tX3dpZHRofXB4O2BcbiAgICB9O1xufVxuZnVuY3Rpb24gc2NhbGUobm9kZSwgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gNDAwLCBlYXNpbmcgPSBjdWJpY091dCwgc3RhcnQgPSAwLCBvcGFjaXR5ID0gMCB9KSB7XG4gICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgIGNvbnN0IHRhcmdldF9vcGFjaXR5ID0gK3N0eWxlLm9wYWNpdHk7XG4gICAgY29uc3QgdHJhbnNmb3JtID0gc3R5bGUudHJhbnNmb3JtID09PSAnbm9uZScgPyAnJyA6IHN0eWxlLnRyYW5zZm9ybTtcbiAgICBjb25zdCBzZCA9IDEgLSBzdGFydDtcbiAgICBjb25zdCBvZCA9IHRhcmdldF9vcGFjaXR5ICogKDEgLSBvcGFjaXR5KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBkZWxheSxcbiAgICAgICAgZHVyYXRpb24sXG4gICAgICAgIGVhc2luZyxcbiAgICAgICAgY3NzOiAoX3QsIHUpID0+IGBcblx0XHRcdHRyYW5zZm9ybTogJHt0cmFuc2Zvcm19IHNjYWxlKCR7MSAtIChzZCAqIHUpfSk7XG5cdFx0XHRvcGFjaXR5OiAke3RhcmdldF9vcGFjaXR5IC0gKG9kICogdSl9XG5cdFx0YFxuICAgIH07XG59XG5mdW5jdGlvbiBkcmF3KG5vZGUsIHsgZGVsYXkgPSAwLCBzcGVlZCwgZHVyYXRpb24sIGVhc2luZyA9IGN1YmljSW5PdXQgfSkge1xuICAgIGNvbnN0IGxlbiA9IG5vZGUuZ2V0VG90YWxMZW5ndGgoKTtcbiAgICBpZiAoZHVyYXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoc3BlZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZHVyYXRpb24gPSA4MDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IGxlbiAvIHNwZWVkO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkdXJhdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBkdXJhdGlvbiA9IGR1cmF0aW9uKGxlbik7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGRlbGF5LFxuICAgICAgICBkdXJhdGlvbixcbiAgICAgICAgZWFzaW5nLFxuICAgICAgICBjc3M6ICh0LCB1KSA9PiBgc3Ryb2tlLWRhc2hhcnJheTogJHt0ICogbGVufSAke3UgKiBsZW59YFxuICAgIH07XG59XG5mdW5jdGlvbiBjcm9zc2ZhZGUoX2EpIHtcbiAgICB2YXIgeyBmYWxsYmFjayB9ID0gX2EsIGRlZmF1bHRzID0gX19yZXN0KF9hLCBbXCJmYWxsYmFja1wiXSk7XG4gICAgY29uc3QgdG9fcmVjZWl2ZSA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCB0b19zZW5kID0gbmV3IE1hcCgpO1xuICAgIGZ1bmN0aW9uIGNyb3NzZmFkZShmcm9tLCBub2RlLCBwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gZCA9PiBNYXRoLnNxcnQoZCkgKiAzMCwgZWFzaW5nID0gY3ViaWNPdXQgfSA9IGFzc2lnbihhc3NpZ24oe30sIGRlZmF1bHRzKSwgcGFyYW1zKTtcbiAgICAgICAgY29uc3QgdG8gPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCBkeCA9IGZyb20ubGVmdCAtIHRvLmxlZnQ7XG4gICAgICAgIGNvbnN0IGR5ID0gZnJvbS50b3AgLSB0by50b3A7XG4gICAgICAgIGNvbnN0IGR3ID0gZnJvbS53aWR0aCAvIHRvLndpZHRoO1xuICAgICAgICBjb25zdCBkaCA9IGZyb20uaGVpZ2h0IC8gdG8uaGVpZ2h0O1xuICAgICAgICBjb25zdCBkID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSBzdHlsZS50cmFuc2Zvcm0gPT09ICdub25lJyA/ICcnIDogc3R5bGUudHJhbnNmb3JtO1xuICAgICAgICBjb25zdCBvcGFjaXR5ID0gK3N0eWxlLm9wYWNpdHk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkZWxheSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiBpc19mdW5jdGlvbihkdXJhdGlvbikgPyBkdXJhdGlvbihkKSA6IGR1cmF0aW9uLFxuICAgICAgICAgICAgZWFzaW5nLFxuICAgICAgICAgICAgY3NzOiAodCwgdSkgPT4gYFxuXHRcdFx0XHRvcGFjaXR5OiAke3QgKiBvcGFjaXR5fTtcblx0XHRcdFx0dHJhbnNmb3JtLW9yaWdpbjogdG9wIGxlZnQ7XG5cdFx0XHRcdHRyYW5zZm9ybTogJHt0cmFuc2Zvcm19IHRyYW5zbGF0ZSgke3UgKiBkeH1weCwke3UgKiBkeX1weCkgc2NhbGUoJHt0ICsgKDEgLSB0KSAqIGR3fSwgJHt0ICsgKDEgLSB0KSAqIGRofSk7XG5cdFx0XHRgXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRyYW5zaXRpb24oaXRlbXMsIGNvdW50ZXJwYXJ0cywgaW50cm8pIHtcbiAgICAgICAgcmV0dXJuIChub2RlLCBwYXJhbXMpID0+IHtcbiAgICAgICAgICAgIGl0ZW1zLnNldChwYXJhbXMua2V5LCB7XG4gICAgICAgICAgICAgICAgcmVjdDogbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjb3VudGVycGFydHMuaGFzKHBhcmFtcy5rZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgcmVjdCB9ID0gY291bnRlcnBhcnRzLmdldChwYXJhbXMua2V5KTtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcnBhcnRzLmRlbGV0ZShwYXJhbXMua2V5KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNyb3NzZmFkZShyZWN0LCBub2RlLCBwYXJhbXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgbm9kZSBpcyBkaXNhcHBlYXJpbmcgYWx0b2dldGhlclxuICAgICAgICAgICAgICAgIC8vIChpLmUuIHdhc24ndCBjbGFpbWVkIGJ5IHRoZSBvdGhlciBsaXN0KVxuICAgICAgICAgICAgICAgIC8vIHRoZW4gd2UgbmVlZCB0byBzdXBwbHkgYW4gb3V0cm9cbiAgICAgICAgICAgICAgICBpdGVtcy5kZWxldGUocGFyYW1zLmtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbGxiYWNrICYmIGZhbGxiYWNrKG5vZGUsIHBhcmFtcywgaW50cm8pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIFtcbiAgICAgICAgdHJhbnNpdGlvbih0b19zZW5kLCB0b19yZWNlaXZlLCBmYWxzZSksXG4gICAgICAgIHRyYW5zaXRpb24odG9fcmVjZWl2ZSwgdG9fc2VuZCwgdHJ1ZSlcbiAgICBdO1xufVxuXG5leHBvcnQgeyBibHVyLCBjcm9zc2ZhZGUsIGRyYXcsIGZhZGUsIGZseSwgc2NhbGUsIHNsaWRlIH07XG4iLCI8c2NyaXB0PlxuaW1wb3J0IHsgb25Nb3VudCwgYWZ0ZXJVcGRhdGUsIHRpY2sgIH0gZnJvbSAnc3ZlbHRlJztcblxuZXhwb3J0IGxldCBoYW1idXJnZXI7XG5cbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cbiAgICBAaW1wb3J0ICcuLi8uLi8uLi9zdHlsZXMvZ2xvYmFsLnZhcmlhYmxlcy5zY3NzJztcblxuICAgICN0b2dnbGUge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG5cbiAgICAuaGFtYnVyZ2VyIHtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xuICAgICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgIHdpZHRoOiAzMnB4O1xuICAgICAgaGVpZ2h0OiAxOHB4O1xuICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIC4zcyAkY3VzdG9tX2FuaW1hdGlvbjtcbiAgICB9XG5cbiAgICAuaGFtYnVyZ2VyOjpiZWZvcmUge1xuICAgICAgY29udGVudDogJyc7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCBibGFjaztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogMDtcbiAgICAgIHJpZ2h0OiAwO1xuICAgICAgd2lkdGg6IDMycHg7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTRweCk7XG4gICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjNzICRjdXN0b21fYW5pbWF0aW9uO1xuICAgIH1cblxuICAgIC5oYW1idXJnZXI6OmFmdGVyIHtcbiAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBib3R0b206IDA7XG4gICAgICByaWdodDogMDtcbiAgICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCBibGFjaztcbiAgICAgIHdpZHRoOiAzMnB4O1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDhweCk7XG4gICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjNzICRjdXN0b21fYW5pbWF0aW9uO1xuICAgIH1cblxuICAgIHNwYW4ubWlkZGxlIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIGJsYWNrO1xuICAgICAgd2lkdGg6IDMycHg7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDUwJTtcbiAgICAgIHJpZ2h0OiAwO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICAgIH1cblxuICBcblxuICAgICN0b2dnbGU6aG92ZXIgKyBsYWJlbCA+IC5oYW1idXJnZXI6OmFmdGVyIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcbiAgICB9XG5cbiAgICAjdG9nZ2xlOmNoZWNrZWQgKyBsYWJlbCA+IC5oYW1idXJnZXI6OmFmdGVyIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcbiAgICB9XG5cbiAgICAjdG9nZ2xlOmhvdmVyICsgbGFiZWwgPiAuaGFtYnVyZ2VyOjpiZWZvcmUge1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xuICAgIH1cblxuICAgICN0b2dnbGU6Y2hlY2tlZCArIGxhYmVsID4gLmhhbWJ1cmdlcjo6YmVmb3JlIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcbiAgICB9XG5cbiAgICBcblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IGJyZWFrcG9pbnQobWQpKXtcbiAgICAgIGxhYmVsIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAuc2hvdy1mb3Itc3Ige1xuICAgICAgYm9yZGVyOiAwO1xuICAgICAgY2xpcDogcmVjdCgxcHgsIDFweCwgMXB4LCAxcHgpO1xuICAgICAgY2xpcC1wYXRoOiBpbnNldCg1MCUpO1xuICAgICAgaGVpZ2h0OiAxcHg7XG4gICAgICBtYXJnaW46IC0xcHg7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgcGFkZGluZzogMDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHdpZHRoOiAxcHg7XG4gICAgICB3b3JkLXdyYXA6IG5vcm1hbCAhaW1wb3J0YW50O1xuICAgIH1cblxuPC9zdHlsZT5cblxuPGlucHV0IGlkPVwidG9nZ2xlXCIgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJoaWRlIHN1Ym5hdi10b2dnbGUgaGlkZS1mb3IteGxnXCI+XG48bGFiZWwgaWQ9XCJuYXYtbGFiZWxcIiBmb3I9XCJ0b2dnbGVcIiBjbGFzcz1cImhpZGUtZm9yLXhsZ1wiPlxuICAgIDxzcGFuIGNsYXNzPVwic2hvdy1mb3Itc3JcIj5OYXZpZ2F0aW9uPC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiaGFtYnVyZ2VyXCIgYmluZDp0aGlzPXtoYW1idXJnZXJ9IHRpdGxlPVwiTmF2aWdhdGlvblwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJtaWRkbGVcIj48L3NwYW4+XG4gICAgPC9zcGFuPlxuPC9sYWJlbD4iLCI8c2NyaXB0PlxuICAgIGltcG9ydCB7IGNyZWF0ZUV2ZW50RGlzcGF0Y2hlciB9IGZyb20gJ3N2ZWx0ZSc7XG4gICAgaW1wb3J0IHsgZmFkZSwgZmx5IH0gZnJvbSAnc3ZlbHRlL3RyYW5zaXRpb24nO1xuXG4gICAgZXhwb3J0IGxldCBzaG93TW9kYWxcbiAgICBcbiAgICBjb25zdCBkaXNwYXRjaCA9IGNyZWF0ZUV2ZW50RGlzcGF0Y2hlcigpO1xuICAgIFxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuICAgIEBpbXBvcnQgJy4uLy4uLy4uL3N0eWxlcy9nbG9iYWwudmFyaWFibGVzLnNjc3MnO1xuXG4gICAgLm1vZGFsLWNvbnRhaW5lcntcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuXHRcdHRvcDogMDtcblx0XHRsZWZ0OiAwO1xuXHRcdHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHotaW5kZXg6IDUwO1xuICAgIH1cblx0Lm1vZGFsLWJhY2tncm91bmQge1xuXHRcdHBvc2l0aW9uOiBmaXhlZDtcblx0XHR0b3A6IDA7XG5cdFx0bGVmdDogMDtcblx0XHR3aWR0aDogMTAwJTtcblx0XHRoZWlnaHQ6IDEwMCU7XG5cdFx0ei1pbmRleDogLTE7XG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsMC4zKTtcblx0fVxuXG5cdC5tb2RhbCB7XG4gICAgICAgIHdpZHRoOiBjYWxjKDEwMHZ3IC0gNGVtKTtcbiAgICAgICAgd2lkdGg6IDgwJTtcblx0XHRtYXgtd2lkdGg6IDY1MHB4O1xuXHRcdG1heC1oZWlnaHQ6IDkwdmg7XG5cdFx0b3ZlcmZsb3c6IGF1dG87XG5cdFx0Ym9yZGVyLXJhZGl1czogMTByZW07XG4gICAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuXHRcdHotaW5kZXg6IDUwO1xuXHRcdFxuXHRcdEBtZWRpYSAobWluLXdpZHRoOiBicmVha3BvaW50KHNtKSkge1xuXHRcdFx0bWF4LWhlaWdodDogNDUwcHg7XG5cdFx0XHRtYXgtd2lkdGg6IDYwMHB4O1xuXHRcdFx0d2lkdGg6IDg1JTtcblx0XHR9XG5cblx0XHRAbWVkaWEgKG1pbi13aWR0aDogYnJlYWtwb2ludChtZCkpIHtcblx0XHRcdHdpZHRoOiA3MCU7XG5cdFx0XHRtYXgtd2lkdGg6IDc1MHB4O1xuXHRcdH1cbiAgICB9IFxuICAgIFxuPC9zdHlsZT5cblxuPGRpdiBjbGFzcz0nY2VudGVyLWFsbCBtb2RhbC1jb250YWluZXIge3Nob3dNb2RhbCA/ICdzaG93LW1vZGFsJyA6ICcnfScgaW46ZmFkZSBvdXQ6ZmFkZSA+XG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJhY2tncm91bmRcIiBvbjpjbGljaz48L2Rpdj5cblx0PGRpdiBjbGFzcz0nbW9kYWwnIGluOmZseT1cInt7IHk6IC0yMCwgZHVyYXRpb246IDQ1MCwgZGVsYXk6IDIwMCwgfX1cIiBvdXQ6Zmx5PVwie3sgeTogLTIwLCBkdXJhdGlvbjogNDUwIH19XCI+XG5cdFx0PHNsb3QgbmFtZT0naGVhZGVyJz48L3Nsb3Q+XG5cdFx0PHNsb3Q+PC9zbG90PlxuXHQ8L2Rpdj5cbjwvZGl2PiIsIjxzY3JpcHQ+XG4gICAgaW1wb3J0IHsgZmFkZSwgZmx5IH0gZnJvbSAnc3ZlbHRlL3RyYW5zaXRpb24nO1xuXG5cdGltcG9ydCBNb2RhbFRlbXBsYXRlIGZyb20gJy4vTW9kYWxUZW1wbGF0ZS5zdmVsdGUnO1xuICAgIGltcG9ydCBCb3hMb2FkZXIgZnJvbSAnLi4vbG9hZGVycy9Cb3hMb2FkZXIuc3ZlbHRlJztcblxuICAgIGV4cG9ydCBsZXQgc2hvd01vZGFsO1xuXG4gICAgbGV0IGhpZGVNb2RhbCA9IGZhbHNlO1xuICAgIGxldCBmaWVsZElucHV0cyA9IFtdO1xuXG4gICAgbGV0IGZvcm1TdGF0ZSA9IHtcbiAgICAgICAgc3VibWl0dGluZ0Zvcm06IGZhbHNlLFxuICAgICAgICBmb3JtU3VjY2VzczogZmFsc2UsXG4gICAgICAgIGZvcm1FcnJvcjogZmFsc2UsXG4gICAgICAgIGhpZGVGaWVsZHM6IGZhbHNlXG4gICAgfVxuXG4gICAgbGV0IGRlZmF1bHRGb3JtU3RhdGUgPSBmb3JtU3RhdGU7XG5cbiAgICBmdW5jdGlvbiByZXNldEZvcm0od2FpdCl7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3Qgc3RhdGVPYmogPSBPYmplY3QuZW50cmllcyhmb3JtU3RhdGUpO1xuXG4gICAgICAgICAgICBmb3IoY29uc3QgW3N0YXRlS2V5LCBzdGF0ZVZhbHVlXSBvZiBzdGF0ZU9iail7XG4gICAgICAgICAgICAgICAgZm9ybVN0YXRlW3N0YXRlS2V5XSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmaWVsZElucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gJyc7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCB3YWl0KVxuICAgIH1cbiAgICBcbiAgICBhc3luYyBmdW5jdGlvbiBoYW5kbGVTdWJtaXQoZSl7XG4gICAgICAgIGZvcm1TdGF0ZS5zdWJtaXR0aW5nRm9ybSA9IHRydWU7XG4gICAgICAgIGZvcm1TdGF0ZS5oaWRlRmllbGRzID0gdHJ1ZVxuICAgICAgICBmb3JtU3RhdGUuZm9ybVN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgZm9ybUZpZWxkTmFtZXMgPSBbJ25hbWUnLCAnZW1haWwnLCAnbWVzc2FnZSddOyAvLyBUT0RPIC0gZ2VuZXJhdGUgZmllbGQgbmFtZXMgYmFzZWQgb24gaW5wdXRzXG4gICAgICAgIGNvbnN0IGZvcm1UZXh0T2JqID0gYnVpbGRGb3JtU3VibWlzc2lvblRleHRPYmooZS50YXJnZXQsIGZvcm1GaWVsZE5hbWVzKTtcbiAgICAgICAgY29uc3QgQVBJX1VSTCA9IGBodHRwczovL3NjcmlwdC5nb29nbGUuY29tL21hY3Jvcy9zL0FLZnljYnlkYmFXSFRBUmNCZUpTMWF1TGRuQlNOaERaMHlPLVNZYkdIMEFsbEEvZXhlY2A7XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0geyBcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogZm9ybVRleHRPYmosXG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChBUElfVVJMLCBzZXR0aW5ncyk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgZm9ybVN0YXRlLnN1Ym1pdHRpbmdGb3JtID0gZmFsc2U7XG4gICAgICAgICAgICBmb3JtU3RhdGUuZm9ybVN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICAgICAgICByZXNldEZvcm0oMTYwMCk7ICAgICAgIFxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBmb3JtU3RhdGUuc3VibWl0dGluZ0Zvcm0gPSBmYWxzZTtcbiAgICAgICAgICAgIGZvcm1TdGF0ZS5mb3JtRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yIHN1Ym1pdHRpbmcgZm9ybScsIGUpXG4gICAgICAgICAgICByZXNldEZvcm0oMTYwMCk7ICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYnVpbGRGb3JtU3VibWlzc2lvblRleHRPYmooZm9ybUV2ZW50VGFyZ2V0LCBmb3JtRmllbGROYW1lcyl7XG4gICAgICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgXG4gICAgICAgIGZvcm1GaWVsZE5hbWVzLmZvckVhY2goZmllbGROYW1lID0+IHtcbiAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGAke2ZpZWxkTmFtZX1gLCBgJHtmb3JtRXZlbnRUYXJnZXRbZmllbGROYW1lXS52YWx1ZX1gKTtcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gZm9ybURhdGFcbiAgICB9XG5cbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cbiAgICBAaW1wb3J0ICcuLi8uLi8uLi9zdHlsZXMvZ2xvYmFsLnZhcmlhYmxlcy5zY3NzJztcblxuICAgLnRleHQtY29udGFpbmVyIGgye1xuICAgICAgICBmb250LXNpemU6IDMwcmVtO1xuICAgICAgICBjb2xvcjogIzgwODA4MDtcbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKXtcbiAgICAgICAgLnRleHQtY29udGFpbmVyIGgye1xuICAgICAgICAgICAgZm9udC1zaXplOiAzNnJlbTsgICBcbiAgICAgICAgfVxuICAgIH1cbiAgICAudGV4dC1jb250YWluZXIgaDI6OmFmdGVye1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGhlaWdodDogN3B4O1xuICAgICAgICBtYXJnaW46IDVyZW0gMHB4IDE4cmVtIDBweDtcbiAgICAgICAgYmFja2dyb3VuZDogbGlnaHRncmF5O1xuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgICAgICBoMjo6YWZ0ZXIge1xuICAgICAgICAgICAgd2lkdGg6IDI1MHB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHtcbiAgICAgICAgbWFyZ2luOiA2cmVtIDByZW0gMTByZW0gMHJlbTtcbiAgICAgICAgZm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnLCBzYW5zLXNlcmlmO1xuICAgICAgICBmb250LXdlaWdodDogMzAwO1xuICAgICAgICBmb250LXNpemU6IDEzcmVtO1xuICAgICAgICBjb2xvcjogY29sb3Ioc2Vjb25kYXJ5KVxuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDY0ZW0pe1xuICAgICAgICBwIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTZyZW1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpdi5mb3JtLWNvbnRhaW5lcntcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgY29sb3I6IGdyYXk7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgIHBhZGRpbmc6IDE1cmVtIDIwcmVtIDQwcmVtIDIwcmVtO1xuICAgICAgICAvKiBib3JkZXI6IDFweCBzb2xpZCBncmF5OyAqL1xuICAgICAgICBib3gtc2hhZG93OiA1cHggNXB4IDVweCBsaWdodGdyYXk7XG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDBlbSl7XG4gICAgICAgIGRpdi5mb3JtLWNvbnRhaW5lciB7XG4gICAgICAgICAgICBwYWRkaW5nOiAzMHJlbSAyMHJlbSA0MHJlbSAyMHJlbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDY0ZW0pe1xuICAgICAgICBkaXYuZm9ybS1jb250YWluZXIge1xuICAgICAgICAgICAgcGFkZGluZzogNDByZW0gMzByZW0gNTByZW0gMzByZW07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXYuZmxleC1jb250YWluZXJ7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgfSBcblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQwZW0pe1xuICAgICAgICBkaXYuZmxleC1jb250YWluZXIge1xuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpdi50ZXh0LWNvbnRhaW5lciB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogYnJlYWtwb2ludChzbSkpIHtcbiAgICAgICAgICAgIHRvcDogLTIwcHg7XG4gICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiAzMHJlbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpdntcbiAgICAgICAgZmxleDogNTUlO1xuICAgIH1cblxuICAgIGZvcm17XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGZsZXg6IDUwJTtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiBhdXRvO1xuICAgIH1cbiAgICBsYWJlbHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgbWFyZ2luOiA0cmVtIDBweDtcbiAgICB9XG4gICAgc3BhbntcbiAgICAgICAgZm9udC1zaXplOiAxM3JlbTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNXJlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcblxuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogYnJlYWtwb2ludChsZykpIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlucHV0W3R5cGU9XCJzdWJtaXRcIl17XG4gICAgICAgIHdpZHRoOiA1MCU7XG4gICAgICAgIG1pbi13aWR0aDogOTZweDtcbiAgICAgICAgbWFyZ2luLXRvcDogMTJyZW07XG4gICAgICAgIHBhZGRpbmc6IDZyZW07XG4gICAgICAgIGZvbnQtc2l6ZTogMTNyZW07XG4gICAgICAgIGJveC1zaGFkb3c6IDFweCAxcHggM3B4IGxpZ2h0Z3JleTtcbiAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDg4LCA4OSwgOTEsIDAuMSk7XG4gICAgICAgIGNvbG9yOiBjb2xvcihzZWNvbmRhcnkpO1xuICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgLjNzIGVhc2UtaW47XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcblxuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogYnJlYWtwb2ludChzbSkpIHtcbiAgICAgICAgICAgIG1heC13aWR0aDogdW5zZXQ7XG4gICAgICAgICAgICBwYWRkaW5nOiA3cmVtIDE1cmVtIDdyZW0gMTVyZW07XG4gICAgICAgIH1cblxuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogYnJlYWtwb2ludChtZCkpIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTNyZW07XG4gICAgICAgICAgICBib3gtc2hhZG93OiAxO1xuICAgICAgICAgICAgd2lkdGg6IGZpdC1jb250ZW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5wdXRbdHlwZT1cInN1Ym1pdFwiXTpob3ZlciB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xcHgpO1xuICAgICAgICBib3gtc2hhZG93OiAycHggMnB4IDNweCBsaWdodGdyZXk7XG4gICAgfVxuXG4gICAgaW5wdXQsIHRleHRhcmVhe1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgZm9udC1zaXplOiAxNnJlbTtcbiAgICAgICAgcGFkZGluZzogM3JlbTtcbiAgICAgICAgYm94LXNoYWRvdzogLjNweCAuM3B4IC4zcHggZ3JheTtcbiAgICB9XG5cbiAgICAuc3VjY2Vzcy1tZXNzYWdlIHtcbiAgICAgICAgZm9udC1zaXplOiA1MHJlbTtcbiAgICAgICAgY29sb3I6IGNvbG9yKHNlY29uZGFyeSk7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICAgICAgICBsZWZ0OiA1MCU7XG4gICAgfVxuXG4gICAgLmdmb3JtLCAudGV4dC1jb250YWluZXIsIC5zdWNjZXNzLW1lc3NhZ2Uge1xuICAgICAgICB0cmFuc2l0aW9uOiAuMzVzIG9wYWNpdHkgZWFzZTtcbiAgICB9XG4gICAgLmhpZGUtY29udGVudHtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICB9XG4gICAgXG48L3N0eWxlPlxuXG57I2lmIHNob3dNb2RhbCAmJiBoaWRlTW9kYWwgPT09IGZhbHNlfVxuXHQ8TW9kYWxUZW1wbGF0ZSBzaG93TW9kYWw9e3Nob3dNb2RhbH0gb246Y2xpY2s+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNvbnRhaW5lciB7Zm9ybVN0YXRlLmhpZGVGaWVsZHMgPyAnaGlkZS1jb250ZW50JyA6ICcnfSB7Zm9ybVN0YXRlLmhpZGVGaWVsZHMgPyAnaGlkZS1jb250ZW50JyA6ICcnfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyPkdldCBJbiBUb3VjaDwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIaSB0aGVyZSEgSeKAmW0gSm9zaCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSSBicmluZyBwcm9qZWN0cyB0byBsaWZlIGJ5IGlubm92YXRpbmcgYWNyb3NzIGVhY2ggYXNwZWN0IG9mIHRoZSBjdXN0b21lciBqb3VybmV5LiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZW5kIG1lIGEgbWVzc2FnZSBpZiB5b3UgYXJlIGxvb2tpbmcgdG8gaGlyZSBhIGRldmVsb3BlciwgY29sbGFib3JhdGUgb24gYSBwcm9qZWN0LCBvciBoYXZlIGEgcG90ZW50aWFsIGJ1c2luZXNzIG9wcG9ydHVuaXR5LlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGZvcm0gXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImdmb3JtIHtmb3JtU3RhdGUuaGlkZUZpZWxkcyA/ICdoaWRlLWNvbnRlbnQnIDogJyd9XG4gICAgICAgICAgICAgICAgICAgICAgICB7Zm9ybVN0YXRlLmZvcm1TdWNjZXNzID8gJ2hpZGUtY29udGVudCcgOiAnJ31cIlxuICAgICAgICAgICAgICAgICAgICAgICAgb246c3VibWl0fHByZXZlbnREZWZhdWx0PXtoYW5kbGVTdWJtaXR9ICBcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPiA8c3Bhbj5OYW1lPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBiaW5kOnRoaXM9e2ZpZWxkSW5wdXRzWzBdfSBuYW1lPVwibmFtZVwiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPiA8c3Bhbj5FbWFpbDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgYmluZDp0aGlzPXtmaWVsZElucHV0c1sxXX0gcmVxdWlyZWQgbmFtZT1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPiA8c3Bhbj5NZXNzYWdlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBiaW5kOnRoaXM9e2ZpZWxkSW5wdXRzWzJdfSBuYW1lPVwibWVzc2FnZVwiIHJvd3M9XCI2XCIgdHlwZT1cInRleHRhcmVhXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiU2VuZCBNZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cblxuICAgICAgICAgICAgICAgIHsjaWYgZm9ybVN0YXRlLnN1Ym1pdHRpbmdGb3JtfVxuICAgICAgICAgICAgICAgICAgICA8Qm94TG9hZGVyIC8+XG4gICAgICAgICAgICAgICAgey9pZn1cbiAgICAgICAgICAgICAgICB7I2lmIGZvcm1TdGF0ZS5mb3JtU3VjY2Vzc31cbiAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwic3VjY2Vzcy1tZXNzYWdlXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICBpbjpmbHk9XCJ7eyB5OiAyMCwgZHVyYXRpb246IDUwMCwgZGVsYXk6IDIwMCwgfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0OmZseT1cInt7IHk6IC0yMCwgZHVyYXRpb246IDUwMCwgZGVsYXk6IDAsIH19XCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgU1VDQ0VTU1xuICAgICAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgIHsvaWZ9XG4gICAgICAgICAgICAgICAgeyNpZiBmb3JtU3RhdGUuZm9ybUVycm9yfVxuICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJzdWNjZXNzLW1lc3NhZ2VcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgIGluOmZseT1cInt7IHk6IDIwLCBkdXJhdGlvbjogNTAwLCBkZWxheTogMjAwLCB9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXQ6Zmx5PVwie3sgeTogLTIwLCBkdXJhdGlvbjogNTAwLCBkZWxheTogMCwgfX1cIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBFUlJPUlxuICAgICAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgIHsvaWZ9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cdDwvTW9kYWxUZW1wbGF0ZT5cbnsvaWZ9IiwiPHNjcmlwdD5cbiAgICBpbXBvcnQgeyBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJztcbiAgICBpbXBvcnQgeyBkcmF3LCBmYWRlLCBibHVyLCBzbGlkZSwgc2NhbGUgfSBmcm9tICdzdmVsdGUvdHJhbnNpdGlvbic7XG4gICAgaW1wb3J0IHsgcXVpbnRPdXQsIHF1YXJ0SW5PdXQgfSBmcm9tICdzdmVsdGUvZWFzaW5nJztcbiAgICBcbiAgICBleHBvcnQgbGV0IGVuYWJsZUZ1bGxBbmltYXRpb24sIGlzQm94VmlzaWJsZSwgdmlzaWJsZSA9IHRydWU7XG5cbiAgICBsZXQgZHVyYXRpb24gPSAyNzUwO1xuICAgIFxuICAgIGxldCB0b2dnbGVGdWxsQW5pbWF0aW9uID0gZmFsc2U7XG5cbiAgICBvbk1vdW50KCgpID0+IHtcbiAgICAgICAgdG9nZ2xlRnVsbEFuaW1hdGlvbiA9IGVuYWJsZUZ1bGxBbmltYXRpb24gPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIGlmKHRvZ2dsZUZ1bGxBbmltYXRpb24pIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgncG9seWdvbicpLmZvckVhY2gocG9seWdvbiA9PiB7XG4gICAgICAgICAgICAgICAgICBwb2x5Z29uLnN0eWxlLmZpbGwgPSAnIzc5Nzc3Nyc7XG4gICAgICAgICAgICAgICAgICBwb2x5Z29uLnN0eWxlLnN0cm9rZSA9ICd3aGl0ZSc7XG4gICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgncGF0aCcpLmZvckVhY2gocGF0aCA9PiB7XG4gICAgICAgICAgICAgICAgICBwYXRoLnN0eWxlLmZpbGwgPSAnIzc5Nzc3Nyc7XG4gICAgICAgICAgICAgICAgICBwYXRoLnN0eWxlLnN0cm9rZSA9ICd3aGl0ZSc7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSwgMjYwMClcbiAgICAgICAgfVxuICAgIH0pXG4gICAgXG48L3NjcmlwdD5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuICAgIEBpbXBvcnQgJy4uLy4uLy4uL3N0eWxlcy9nbG9iYWwudmFyaWFibGVzLnNjc3MnO1xuICAgIHN2ZyB7XG4gICAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgICBwYWRkaW5nOiAycHg7XG4gICAgfVxuXG4gICAgcGF0aCB7XG4gICAgICAgIGZpbGw6ICM3OTc3Nzc7XG4gICAgfVxuICAgIHBvbHlnb24ge1xuICAgICAgICBmaWxsOiAjNzk3Nzc3O1xuICAgIH1cblxuICAgICNsb2dvLWZ1bGwtYW5pbWF0aW9uIHtcbiAgICAgIHdpZHRoOiAxMDBweDtcbiAgICAgIHBhZGRpbmc6IDIwcHg7XG5cbiAgICAgIEBtZWRpYSAobWluLXdpZHRoOiBicmVha3BvaW50KG1kKSkge1xuICAgICAgICB3aWR0aDogMTI1cHg7XG4gICAgICB9XG5cbiAgICAgIEBtZWRpYSAobWluLXdpZHRoOiBicmVha3BvaW50KGxnKSkge1xuICAgICAgICB3aWR0aDogMTUwcHg7XG4gICAgICB9XG4gICAgICAvLyBwYXRoIHtcblxuICAgICAgLy8gfVxuICAgICAgcGF0aCwgcG9seWdvbiB7XG4gICAgICAgIGZpbGw6IHRyYW5zcGFyZW50O1xuICAgICAgICB0cmFuc2l0aW9uOiAycyBlYXNlO1xuICAgICAgfVxuICAgIH1cbjwvc3R5bGU+XG5cbnsjaWYgZW5hYmxlRnVsbEFuaW1hdGlvbiAmJiB2aXNpYmxlfVxuICA8c3ZnIFxuICAgIG91dDpzY2FsZT1cInt7ZHVyYXRpb246IDQ1MCwgZGVsYXk6IDAsIGVhc2luZzogcXVhcnRJbk91dH19XCJcbiAgICBpZD1cImxvZ28tZnVsbC1hbmltYXRpb25cIiBcbiAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgXG4gICAgdmlld0JveD1cIjAgMCAxMzkuNyAxMjUuN1wiXG4gID5cbiAgICA8ZGVmcz5cbiAgICAgIDxzdHlsZT5cbiAgICAgICAgLmNscy0xIHtcbiAgICAgICAgICBmaWxsOiAjMjMxZjIwO1xuICAgICAgICB9XG4gICAgICA8L3N0eWxlPlxuICAgIDwvZGVmcz5cbiAgICB7I2lmIHRvZ2dsZUZ1bGxBbmltYXRpb259XG4gICAgICA8Zz5cbiAgICAgICAgPHBhdGggXG4gICAgICAgICAgICBpbjpkcmF3PVwie3tkdXJhdGlvbjogMzI1MCwgZGVsYXk6IDE1MDAsIGVhc2luZzogcXVhcnRJbk91dH19XCJcbiAgICAgICAgICAgIGlkPVwiUlwiIFxuICAgICAgICAgICAgc3R5bGU9XCJzdHJva2U6ICM3OTc3Nzc7IHN0cm9rZS13aWR0aDogMVwiXG4gICAgICAgICAgICBjbGFzcz1cImNscy0xXCIgXG4gICAgICAgICAgICBkPVwiTTg0LjgsMzAuN2g0NS40VjI1LjFINzEuNlY0Nkg4NGE0LjIsNC4yLDAsMSwxLDAsOC40SDcxLjZWNzQuM2g2LjdsMTIuMywyNS44aDI2LjFMMTAwLjksNjkuNGEyMi44LDIyLjgsMCwwLDAsMTAuMy0xOC44SDExNFYzOS4zSDEwMi44VjUwLjZoMi43YTE3LjMsMTcuMywwLDAsMS05LjcsMTUuMmwtMi41LDEuMy40LjgsMTMuNywyNi41SDk0LjFMODEuOSw2OC42SDc3LjJWNjBIODRhOS44LDkuOCwwLDEsMCwwLTE5LjZINzcuMlYzMC43WlwiXG4gICAgICAgIC8+XG4gICAgICAgIDxwb2x5Z29uIFxuICAgICAgICAgICAgaW46ZHJhdz1cInt7ZHVyYXRpb246IGR1cmF0aW9uLCBkZWxheTogMCwgZWFzaW5nOiBxdWFydEluT3V0fX1cIiBcbiAgICAgICAgICAgIHN0eWxlPVwic3Ryb2tlOiAjNzk3Nzc3OyBzdHJva2Utd2lkdGg6IDFcIlxuICAgICAgICAgICAgaWQ9XCJCT1RUT00tTGluZVwiIFxuICAgICAgICAgICAgY2xhc3M9XCJjbHMtMVwiIFxuICAgICAgICAgICAgcG9pbnRzPVwiMTI4LjUgNDMuNCAxMjguNSA1NC42IDEyOC44IDU0LjYgMTMxLjIgNTQuNiAxMzEuMiAxMjAuMSAxNS4yIDEyMC4xIDE1LjIgOTUgOS41IDk1IDkuNSAxMjUuNyA5LjkgMTI1LjcgMTUuMiAxMjUuNyAxMzEuMiAxMjUuNyAxMzYuOSAxMjUuNyAxMzYuOSAxMjAuMSAxMzYuOSA1NC42IDEzOS4zIDU0LjYgMTM5LjcgNTQuNiAxMzkuNyA0My40IDEyOC41IDQzLjRcIlxuICAgICAgICAvPlxuICAgICAgICA8cGF0aCBcbiAgICAgICAgICAgIGluOmRyYXc9XCJ7e2R1cmF0aW9uOiAzMjUwLCBkZWxheTogMTUwMCwgZWFzaW5nOiBxdWFydEluT3V0fX1cIlxuICAgICAgICAgICAgaWQ9XCJKXCIgXG4gICAgICAgICAgICBzdHlsZT1cInN0cm9rZTogIzc5Nzc3Nzsgc3Ryb2tlLXdpZHRoOiAxXCJcbiAgICAgICAgICAgIGNsYXNzPVwiY2xzLTFcIiBcbiAgICAgICAgICAgIGQ9XCJNNDMuMywyNS4xdjQ4YzAsNC42LTIsNi43LTYuMiw2LjdIMzQuN1Y3N0gyMy41Vjg4LjJIMzQuN1Y4NS41aDIuNGM3LjMsMCwxMS45LTQuOCwxMS45LTEyLjRWMzAuN0g2MC4zVjczLjVDNjAuMyw4OC4zLDQ4LjYsOTUsMzcuMSw5NUg5LjV2NS43SDM3LjFhMzEuMywzMS4zLDAsMCwwLDE5LjYtNi42YzYtNC45LDkuMi0xMi4xLDkuMi0yMC42VjI1LjFaXCJcbiAgICAgICAgLz5cbiAgICAgICAgPHBvbHlnb24gXG4gICAgICAgICAgICBpbjpkcmF3PVwie3tkdXJhdGlvbjogZHVyYXRpb24sIGRlbGF5OiA1MDAsIGVhc2luZzogcXVhcnRJbk91dH19XCIgXG4gICAgICAgICAgICBzdHlsZT1cInN0cm9rZTogIzc5Nzc3Nzsgc3Ryb2tlLXdpZHRoOiAxXCJcbiAgICAgICAgICAgIGlkPVwiVE9QLUxpbmVcIiBcbiAgICAgICAgICAgIGNsYXNzPVwiY2xzLTFcIiBcbiAgICAgICAgICAgIHBvaW50cz1cIjEyOS43IDAgMTI0LjUgMCA4LjQgMCAyLjggMCAyLjggNS43IDIuOCA3MS4xIDAuMyA3MS4xIDAgNzEuMSAwIDgyLjQgMTEuMiA4Mi40IDExLjIgNzEuMSAxMC45IDcxLjEgOC40IDcxLjEgOC40IDUuNyAxMjQuNSA1LjcgMTI0LjUgMzAuNyAxMzAuMiAzMC43IDEzMC4yIDAgMTI5LjcgMFwiXG4gICAgICAgIC8+XG4gICAgICA8L2c+XG4gICAgey9pZn1cbiAgPC9zdmc+XG57L2lmfVxuXG57I2lmICFlbmFibGVGdWxsQW5pbWF0aW9uICYmIHZpc2libGV9XG4gIDxzdmcgXG4gICAgaWQ9XCJKUi1Mb2dvLVNxdWVyZVwiIFxuICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBcbiAgICB2aWV3Qm94PVwiMCAwIDEzOS43IDEyNS43XCJcbiAgPlxuICAgIDxkZWZzPlxuICAgICAgPHN0eWxlPlxuICAgICAgICAuY2xzLTEge1xuICAgICAgICAgIGZpbGw6ICMyMzFmMjA7XG4gICAgICAgIH1cbiAgICAgIDwvc3R5bGU+XG4gICAgPC9kZWZzPlxuICAgIDxnPlxuICAgICAgPHBhdGggXG4gICAgICAgICAgaWQ9XCJSXCIgXG4gICAgICAgICAgY2xhc3M9XCJjbHMtMVwiIFxuICAgICAgICAgIGQ9XCJNODQuOCwzMC43aDQ1LjRWMjUuMUg3MS42VjQ2SDg0YTQuMiw0LjIsMCwxLDEsMCw4LjRINzEuNlY3NC4zaDYuN2wxMi4zLDI1LjhoMjYuMUwxMDAuOSw2OS40YTIyLjgsMjIuOCwwLDAsMCwxMC4zLTE4LjhIMTE0VjM5LjNIMTAyLjhWNTAuNmgyLjdhMTcuMywxNy4zLDAsMCwxLTkuNywxNS4ybC0yLjUsMS4zLjQuOCwxMy43LDI2LjVIOTQuMUw4MS45LDY4LjZINzcuMlY2MEg4NGE5LjgsOS44LDAsMSwwLDAtMTkuNkg3Ny4yVjMwLjdaXCJcbiAgICAgIC8+XG4gICAgICB7I2lmICFpc0JveFZpc2libGV9XG4gICAgICAgIDxwb2x5Z29uIFxuICAgICAgICAgICAgaW46ZmFkZT1cInt7ZHVyYXRpb246IDQwMCwgZGVsYXk6IDB9fVwiIFxuICAgICAgICAgICAgb3V0OmZhZGU9XCJ7e2R1cmF0aW9uOiAyNTAsIGRlbGF5OiAwfX1cIiBcbiAgICAgICAgICAgIGlkPVwiQk9UVE9NLUxpbmVcIiBcbiAgICAgICAgICAgIGNsYXNzPVwiY2xzLTFcIiBcbiAgICAgICAgICAgIHBvaW50cz1cIjEyOC41IDQzLjQgMTI4LjUgNTQuNiAxMjguOCA1NC42IDEzMS4yIDU0LjYgMTMxLjIgMTIwLjEgMTUuMiAxMjAuMSAxNS4yIDk1IDkuNSA5NSA5LjUgMTI1LjcgOS45IDEyNS43IDE1LjIgMTI1LjcgMTMxLjIgMTI1LjcgMTM2LjkgMTI1LjcgMTM2LjkgMTIwLjEgMTM2LjkgNTQuNiAxMzkuMyA1NC42IDEzOS43IDU0LjYgMTM5LjcgNDMuNCAxMjguNSA0My40XCJcbiAgICAgICAgLz5cbiAgICAgIHsvaWZ9XG4gICAgICA8cGF0aCBcbiAgICAgICAgICBpZD1cIkpcIiBcbiAgICAgICAgICBjbGFzcz1cImNscy0xXCIgXG4gICAgICAgICAgZD1cIk00My4zLDI1LjF2NDhjMCw0LjYtMiw2LjctNi4yLDYuN0gzNC43Vjc3SDIzLjVWODguMkgzNC43Vjg1LjVoMi40YzcuMywwLDExLjktNC44LDExLjktMTIuNFYzMC43SDYwLjNWNzMuNUM2MC4zLDg4LjMsNDguNiw5NSwzNy4xLDk1SDkuNXY1LjdIMzcuMWEzMS4zLDMxLjMsMCwwLDAsMTkuNi02LjZjNi00LjksOS4yLTEyLjEsOS4yLTIwLjZWMjUuMVpcIlxuICAgICAgLz5cbiAgICAgIHsjaWYgIWlzQm94VmlzaWJsZX1cbiAgICAgICAgPHBvbHlnb24gXG4gICAgICAgICAgICBpbjpmYWRlPVwie3tkdXJhdGlvbjogNDAwLCBkZWxheTogMH19XCIgXG4gICAgICAgICAgICBvdXQ6ZmFkZT1cInt7ZHVyYXRpb246IDI1MCwgZGVsYXk6IDB9fVwiIFxuICAgICAgICAgICAgaWQ9XCJUT1AtTGluZVwiIFxuICAgICAgICAgICAgY2xhc3M9XCJjbHMtMVwiIFxuICAgICAgICAgICAgcG9pbnRzPVwiMTI5LjcgMCAxMjQuNSAwIDguNCAwIDIuOCAwIDIuOCA1LjcgMi44IDcxLjEgMC4zIDcxLjEgMCA3MS4xIDAgODIuNCAxMS4yIDgyLjQgMTEuMiA3MS4xIDEwLjkgNzEuMSA4LjQgNzEuMSA4LjQgNS43IDEyNC41IDUuNyAxMjQuNSAzMC43IDEzMC4yIDMwLjcgMTMwLjIgMCAxMjkuNyAwXCJcbiAgICAgICAgLz5cbiAgICAgIHsvaWZ9XG4gICAgPC9nPlxuICA8L3N2Zz5cbnsvaWZ9IiwiPHNjcmlwdD5cbmV4cG9ydCBsZXQgdGV4dDtcblxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuICAgIEBpbXBvcnQgJy4uLy4uL3N0eWxlcy9nbG9iYWwudmFyaWFibGVzLnNjc3MnO1xuXG5zcGFuLmhvdmVyLWFuaW1hdGlvbiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHBhZGRpbmctcmlnaHQ6IDMwcHg7ICAgXG59XG5cbnNwYW4udGV4dC1hbmltYXRpb246OmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZDtcbiAgICB3aWR0aDogMjBweDtcbiAgICB0b3A6IDUwJTtcbiAgICBsZWZ0OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0zMHB4LC01MCUpO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xufVxuXG5zcGFuLmhvdmVyLWFuaW1hdGlvbiA+IHNwYW4udGV4dC1hbmltYXRpb24ge1xuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuM3MgJGN1c3RvbV9hbmltYXRpb247XG59XG5cbjpnbG9iYWwoYTpob3ZlcikgPiBzcGFuLmhvdmVyLWFuaW1hdGlvbiA+IHNwYW4udGV4dC1hbmltYXRpb24ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDMwcHgpO1xufVxuXG48L3N0eWxlPlxuXG48c3BhbiBjbGFzcz1cImhvdmVyLWFuaW1hdGlvblwiPlxuICAgIDxzcGFuIGNsYXNzPVwidGV4dC1hbmltYXRpb25cIj57dGV4dH08L3NwYW4+XG48L3NwYW4+IiwiPHNjcmlwdD5cbmltcG9ydCBIYW1idXJnZXIgZnJvbSAnLi9IYW1idXJnZXIuc3ZlbHRlJztcbmltcG9ydCBDb250YWN0TW9kYWwgZnJvbSAnLi4vLi4vY29tbW9uLWNvbXBvbmVudHMvbW9kYWxzL0NvbnRhY3RNb2RhbC5zdmVsdGUnO1xuaW1wb3J0IExvZ28gZnJvbSAnLi9Mb2dvLnN2ZWx0ZSc7XG5pbXBvcnQgVGV4dEFuaW1hdGlvbiBmcm9tICcuLi8uLi9jb21tb24tY29tcG9uZW50cy9UZXh0QW5pbWF0aW9uLnN2ZWx0ZSc7XG5cbmltcG9ydCB7IG9uTW91bnQgfSBmcm9tICdzdmVsdGUnO1xuXG5pbXBvcnQgeyBkcmF3LCBmYWRlLCBibHVyLCBzbGlkZSwgc2NhbGUsIGZseSB9IGZyb20gJ3N2ZWx0ZS90cmFuc2l0aW9uJztcbmltcG9ydCB7IHF1aW50T3V0LCBxdWFydEluT3V0IH0gZnJvbSAnc3ZlbHRlL2Vhc2luZyc7XG5cbmV4cG9ydCBsZXQgc2VnbWVudCwgbG9hZENvbXBvbmVudHM7XG5cbmxldCBzaG93TW9kYWw7XG5cbmxldCB3aW5kb3dZO1xubGV0IGhhbWJ1cmdlcjtcbmxldCB0b2dnbGUgPSBmYWxzZTtcblxubGV0IHJlZHVjZU5hdlNpemUgPSBmYWxzZTtcblxubGV0IGFjdGl2ZU5hdmlnYXRpb24gPSB7XG4gICAgaG9tZTogZmFsc2UsXG4gICAgYWJvdXQ6IGZhbHNlLFxuICAgIGV4cGVyaWVuY2U6IGZhbHNlXG59XG5cbiQ6IGhlYWRlckNsYXNzID0gbmF2U2l6ZSh3aW5kb3dZKTtcblxuZnVuY3Rpb24gbmF2U2l6ZSh5KXtcbiAgICBpZih5ID4gNzUpe1xuICAgICAgICByZWR1Y2VOYXZTaXplID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZWR1Y2VOYXZTaXplID0gZmFsc2U7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB0b2dnbGVyT2ZmKCl7XG4gICAgaWYod2luZG93LmlubmVyV2lkdGggPCAxMDIzKXtcbiAgICAgICAgLy8gdG9nZ2xlID0gdHJ1ZTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZ2dsZScpLmNsaWNrKCk7XG4gICAgICAgIC8vIGhhbWJ1cmdlciA/IGhhbWJ1cmdlci4kJC5jdHguaGFtYnVyZ2VyLmNsaWNrKCkgOiBudWxsO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVzZXRBY3RpdmVOYXYoKSB7XG4gICAgbGV0IGFjdGl2ZU5hdk9iaiA9IE9iamVjdC5lbnRyaWVzKGFjdGl2ZU5hdmlnYXRpb24pO1xuICAgIFxuICAgIGZvcihsZXQgW2tleSwgdmFsdWVdIG9mIGFjdGl2ZU5hdk9iail7XG4gICAgICAgIGFjdGl2ZU5hdmlnYXRpb25ba2V5XSA9IGZhbHNlO1xuICAgIH1cbn1cblxuLy8gVE9ETyAtLSB0aGVzZSBmdW5jdGlvbnMgbmVlZCB0byBiZSBjbGVhbmVkIHVwIC0gbm90IHVzaW5nIGFsbCBvZiB0aGlzIGFueW1vcmUgKHVzaW5nIHNlZ21lbnQgcHJvcCBpbnN0ZWFkKVxuXG5mdW5jdGlvbiBzZXRBY3RpdmVOYXZPbkNsaWNrKCkge1xuICAgIFxuICAgIGxldCBhY3RpdmVOYXZPYmogPSBPYmplY3QuZW50cmllcyhhY3RpdmVOYXZpZ2F0aW9uKTtcbiAgICBsZXQgZWxUZXh0ID0gYCR7dGhpcy5pbm5lckhUTUwudG9Mb3dlckNhc2UoKX1gO1xuICAgIFxuICAgIGZvcihsZXQgW2tleSwgdmFsdWVdIG9mIGFjdGl2ZU5hdk9iail7XG4gICAgICAgIGlmKGtleSA9PT0gZWxUZXh0KXtcbiAgICAgICAgICAgIGFjdGl2ZU5hdmlnYXRpb25ba2V5XSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY3RpdmVOYXZpZ2F0aW9uW2tleV0gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b2dnbGVyT2ZmKCk7XG59XG5cbmZ1bmN0aW9uIHNldEFjdGl2ZU5hdigpIHtcbiAgICBsZXQgcGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcblxuICAgIGlmKHBhdGggPT09ICcvJykgYWN0aXZlTmF2aWdhdGlvbi5ob21lID0gdHJ1ZTtcbiAgICBlbHNlIGlmIChwYXRoID09PSAnL2Fib3V0JykgYWN0aXZlTmF2aWdhdGlvbi5hYm91dCA9IHRydWU7XG4gICAgZWxzZSBpZiAocGF0aCA9PT0gJy9leHBlcmllbmNlJykgYWN0aXZlTmF2aWdhdGlvbi5leHBlcmllbmNlID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gb3Blbk1vZGFsKCl7XG4gICAgc2hvd01vZGFsID0gdHJ1ZTtcbn1cblxub25Nb3VudCgoKSA9PiB7XG4gICAgc2V0QWN0aXZlTmF2KCk7XG59KVxuXG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCI+XG4gICAgQGltcG9ydCAnLi4vLi4vLi4vc3R5bGVzL2dsb2JhbC52YXJpYWJsZXMuc2Nzcyc7XG5cbiAgICBoZWFkZXIge1xuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Q2ZDZkNjtcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICB6LWluZGV4OiA1MDtcbiAgICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgfVxuXG4gICAgbmF2IHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAvLyBwYWRkaW5nOiAzMHJlbSAyMHJlbTtcbiAgICAgICAgLy8gcGFkZGluZzogMTMuNXJlbSAyMHJlbTtcbiAgICAgICAgcGFkZGluZzogMHJlbSAyMHJlbTtcbiAgICAgICAgdHJhbnNpdGlvbjogLjNzIGN1YmljLWJlemllcigwLjg1LCAwLjA4LCAwLjA4LCAwLjk5KTtcbiAgICAgICAgaGVpZ2h0OiA4MHB4O1xuICAgICAgICAvLyBwYWRkaW5nXG4gICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiBicmVha3BvaW50KHNtKSkge1xuICAgICAgICAgICAgLy8gcGFkZGluZzogMzVyZW0gNDByZW07XG4gICAgICAgICAgICBwYWRkaW5nOiAwcmVtIDQwcmVtO1xuICAgICAgICAgICAgaGVpZ2h0OiA5MHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQobWQpKSB7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwNXB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmF2LnNjcm9sbGVkIHtcbiAgICAgICAgLy8gcGFkZGluZzogMjByZW0gMjByZW07XG4gICAgICAgIC8vIHBhZGRpbmc6IDMuNXJlbSAyMHJlbTtcbiAgICAgICAgaGVpZ2h0OiA2MHB4O1xuXG4gICAgICAgIC8vIEBtZWRpYSAobWluLXdpZHRoOiBicmVha3BvaW50KHNtKSkge1xuICAgICAgICAvLyAgICAgcGFkZGluZzogMjByZW0gNDByZW07XG4gICAgICAgIC8vIH1cblxuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogYnJlYWtwb2ludChtZCkpIHtcbiAgICAgICAgICAgIGhlaWdodDogNzVweDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5uYXZpZ2F0aW9uIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICB6LWluZGV4OiAyO1xuICAgICAgICBtaW4td2lkdGg6IDI1MHB4O1xuICAgICAgICB3aWR0aDogODUlO1xuICAgICAgICBtYXgtd2lkdGg6IDMwMHB4O1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpO1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIG1pbi1oZWlnaHQ6IDUwMHB4O1xuICAgICAgICBvdmVyZmxvdy15OiBzY3JvbGw7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgcGFkZGluZzogNDVyZW0gMzByZW07XG4gICAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuNDVzICRjdXN0b21fYW5pbWF0aW9uO1xuXG4gICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiBicmVha3BvaW50KHNtKSkge1xuICAgICAgICAgICAgcGFkZGluZzogODByZW0gNDByZW07XG4gICAgICAgIH1cblxuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogYnJlYWtwb2ludChtZCkpIHtcbiAgICAgICAgICAgIC8vIG92ZXJmbG93LXk6IGF1dG87XG4gICAgICAgICAgICBtaW4taGVpZ2h0OiB1bnNldDtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IG5vbmU7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHVuc2V0OyAgIFxuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgbWF4LXdpZHRoOiB1bnNldDtcbiAgICAgICAgICAgIG1pbi13aWR0aDogdW5zZXQ7XG4gICAgICAgICAgICB3aWR0aDogdW5zZXQ7XG4gICAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAgICAgb3ZlcmZsb3cteTogdmlzaWJsZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIDpnbG9iYWwoI3RvZ2dsZTpjaGVja2VkIH4gLm5hdmlnYXRpb24pe1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG4gICAgfVxuXG4gICAgLm5hdmlnYXRpb24tbGlzdCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gICAgICAgIC8vIHBhZGRpbmc6IDA7XG5cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQobWQpKSB7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxpIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgbWFyZ2luOiA1cmVtIDByZW07XG4gICAgICAgIHBhZGRpbmc6IDVyZW0gNnJlbTtcbiAgICAgICAgd2lkdGg6IGF1dG87XG4gICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgICAgICAgZm9udC1zaXplOiAxNnJlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcblxuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogYnJlYWtwb2ludChtZCkpIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTZyZW07XG4gICAgICAgICAgICBtYXJnaW46IDByZW0gMTRyZW07XG4gICAgICAgICAgICBwYWRkaW5nOiAxMHJlbSA2cmVtO1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgICAgIC8vIHZvXG5cbiAgICAgICAgICAgICY6bGFzdC1vZi10eXBlIHtcbiAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiBicmVha3BvaW50KG1kKSl7ICAgICAgIFxuICAgICAgICBwe1xuICAgICAgICAgICAgZm9udC1zaXplOiAxOHJlbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5uYXYtaXRlbTo6YWZ0ZXIsIC5zZWxlY3RlZCAubmF2LWl0ZW06OmFmdGVyIHtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTAwJSwgLTUwJSk7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICB3aWR0aDogY2FsYygxMDAlICsgMTJweCk7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtMTAlO1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICBoZWlnaHQ6IDhweDtcbiAgICAgICAgYmFja2dyb3VuZDogI2MwYmRiZDtcbiAgICAgICAgei1pbmRleDogLTE7XG4gICAgICAgIG9wYWNpdHk6IC41O1xuICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjQ1cyAkY3VzdG9tX2FuaW1hdGlvbjtcblxuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogYnJlYWtwb2ludChtZCkpIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICM3OTc3Nzc7XG4gICAgICAgICAgICB0b3A6IDkwJTtcbiAgICAgICAgICAgIGhlaWdodDogNnB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gLnNlbGVjdGVkIC5uYXYtaXRlbTo6YWZ0ZXIge1xuICAgIC8vICAgICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQobWQpKSB7XG4gICAgLy8gICAgICAgICB0cmFuc2l0aW9uLWRlbGF5OiAuMXM7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICBsaTpob3ZlciAubmF2LWl0ZW06OmFmdGVyLCAuc2VsZWN0ZWQgLm5hdi1pdGVtOjphZnRlciB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC01MCUpO1xuICAgIH1cblxuICAgIC5tb2RhbC1hY3RpdmUgLnNlbGVjdGVkOm5vdCgub3Blbi1tb2RhbCkgLm5hdi1pdGVtOjphZnRlciB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDEwMCUsIC01MCUpICFpbXBvcnRhbnQ7IFxuICAgIH1cblxuICAgIC5jbG9zZS1jb250YWluZXIge1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIHdpZHRoOiAzMnB4O1xuICAgICAgICBoZWlnaHQ6IDMycHg7XG5cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQobWQpKSB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLmNsb3NlIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHdpZHRoOjMycHg7XG4gICAgICAgIGhlaWdodDozMnB4O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxuXG4gICAgLmNsb3NlOjpiZWZvcmUge1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrO1xuICAgICAgICB3aWR0aDogMjZweDtcbiAgICAgICAgdG9wOiAxNnB4O1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICAgIH1cblxuICAgIC5jbG9zZTo6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrO1xuICAgICAgICB3aWR0aDogMjZweDtcbiAgICAgICAgdG9wOiAxNnB4O1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcbiAgICB9XG5cbiAgICAubmF2LWl0ZW0ge1xuICAgICAgICAvLyBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZTtcbiAgICAgICAgLy8gcGFkZGluZzogNXJlbSAwcmVtO1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIH1cblxuICAgIC5sb2dvLXRleHQge1xuICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgfVxuICAgIC5jb2RlIHtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDEwMDtcbiAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgICAgICBvcGFjaXR5OiAuMztcbiAgICB9XG5cbiAgICAubG9nbzpob3ZlciAubG9nby1ob3ZlciB7XG4gICAgICAgIGNvbG9yOiBibGFjaztcbiAgICB9XG5cbiAgICAuYmFja2dyb3VuZCB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMzE5KTtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICB3aWR0aDogMTAwdnc7XG4gICAgICBoZWlnaHQ6IDEwMHZoO1xuICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgYm90dG9tOiAwO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHotaW5kZXg6IDE7XG4gICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IC4xNXMgZWFzZS1pbiwgdmlzaWJpbGl0eSAuMTVzIGxpbmVhcjtcbiAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcblxuICAgICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQobWQpKSB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgOmdsb2JhbCgjdG9nZ2xlOmNoZWNrZWQgfiAuYmFja2dyb3VuZCkge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICAgIGFuaW1hdGlvbjogdW5zZXQ7XG4gICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IC4yNXMgZWFzZS1pbjtcbiAgICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gICAgfVxuXG4gICAgLnRleHQtY3RhIHtcbiAgICAgICAgdGV4dC1hbGlnbjogZW5kO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAxNXB4O1xuICAgIH1cblxuICAgIC50ZXh0LWN0YSBhIHtcbiAgICAgICAgZm9udC1zaXplOiAxNHJlbTtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gICAgfVxuXG4gICAgLnRleHQtY3RhIC50aXRsZSB7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiAxMDA7XG4gICAgICAgIGZvbnQtc2l6ZTogMTJyZW07XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICAgIH1cblxuICAgIFxuXG4gICAgLm1vYmlsZS10b3Age1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cblxuICAgIC5tb2JpbGUtdG9wLCAubW9iaWxlLWJvdHRvbSB7XG5cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQobWQpKSB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLnNvY2lhbC1pY29ucyB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmRcbiAgICB9XG5cbiAgICBpIHtcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6MTJweDtcbiAgICAgICAgY29sb3I6ICM1QTVBNUE7XG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAuM3MgZWFzZTtcbiAgICB9XG5cbiAgICAuc29jaWFsLWljb246bGFzdC1vZi10eXBlIGkge1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgfVxuXG4gICAgLnNvY2lhbC1pY29uOmhvdmVyID4gaSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtM3B4KTtcbiAgICB9XG5cbjwvc3R5bGU+XG5cbjxzdmVsdGU6d2luZG93IGJpbmQ6c2Nyb2xsWT17d2luZG93WX0vPlxuXG57I2lmIGxvYWRDb21wb25lbnRzfVxuICAgIDxoZWFkZXIgaW46Zmx5PVwie3sgeTogLTE1LCBkdXJhdGlvbjogMjAwLCBkZWxheTogMCwgfX1cIj5cbiAgICAgICAgPG5hdiBjbGFzcz17cmVkdWNlTmF2U2l6ZSA/ICdzY3JvbGxlZCBjb250YWluZXInIDogJ2NvbnRhaW5lcid9PlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGEgaHJlZj0nLycgb246Y2xpY2s9eygpID0+IHtyZXNldEFjdGl2ZU5hdigpOyBhY3RpdmVOYXZpZ2F0aW9uLmhvbWUgPSB0cnVlO319IGNsYXNzPVwibG9nb1wiPlxuICAgICAgICAgICAgICAgICAgICA8IS0tIDxMb2dvIFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNCb3hWaXNpYmxlPXtyZWR1Y2VOYXZTaXplID8gdHJ1ZSA6IGZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAvPiAtLT5cbiAgICAgICAgICAgICAgICAgICAgPExvZ28gLz5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSA8aW1nIHdpZHRoPVwiMjVcIiBzcmM9XCJpbWFnZXMvbG9nby5zdmdcIiBhbHQ9XCJcIj4gLS0+XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8IS0tIDxwIGNsYXNzPVwibG9nby10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvZGVcIj4mbHQ7aDEmZ3Q7PC9zcGFuPkhpIFRoZXJlPHNwYW4gY2xhc3M9XCJsb2dvLWhvdmVyXCI+ITwvc3Bhbj48c3BhbiBjbGFzcz1cImNvZGVcIj4mbHQ7L2gxJmd0Ozwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9wPiAtLT5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPEhhbWJ1cmdlciB0b2dnbGU9e3RvZ2dsZX0gYmluZDp0aGlzPXtoYW1idXJnZXJ9IC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhY2tncm91bmRcIiBvbjpjbGljaz17dG9nZ2xlck9mZn0+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hdmlnYXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vYmlsZS10b3BcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMb2dvIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQm94VmlzaWJsZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IG9uOmNsaWNrPXt0b2dnbGVyT2ZmfSBjbGFzcz1cImNsb3NlLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2xvc2VcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJuYXZpZ2F0aW9uLWxpc3Qge3Nob3dNb2RhbCA/ICdtb2RhbC1hY3RpdmUnIDogJyd9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW46Zmx5PVwie3sgeTogLTE1LCBkdXJhdGlvbjogNTAwLCBkZWxheTogMjAwLCB9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ7c2VnbWVudCA9PT0gdW5kZWZpbmVkID8gJ3NlbGVjdGVkJyA6ICcnfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJuYXYtaXRlbVwiIG9uOmNsaWNrPXtzZXRBY3RpdmVOYXZPbkNsaWNrfSByZWw9cHJlZmV0Y2ggaHJlZj1cIi9cIj5Ib21lPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbjpmbHk9XCJ7eyB5OiAtMTUsIGR1cmF0aW9uOiA1MDAsIGRlbGF5OiAzMDAsIH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIntzZWdtZW50ID09PSAnYWJvdXQnID8gJ3NlbGVjdGVkJyA6ICcnfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJuYXYtaXRlbVwiIG9uOmNsaWNrPXtzZXRBY3RpdmVOYXZPbkNsaWNrfSByZWw9cHJlZmV0Y2ggaHJlZj1cIi9hYm91dFwiPkFib3V0PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbjpmbHk9XCJ7eyB5OiAtMTUsIGR1cmF0aW9uOiA1MDAsIGRlbGF5OiA0MDAsIH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIntzZWdtZW50ID09PSAncHJvamVjdHMnID8gJ3NlbGVjdGVkJyA6ICcnfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJuYXYtaXRlbVwiIG9uOmNsaWNrPXtzZXRBY3RpdmVOYXZPbkNsaWNrfSByZWw9cHJlZmV0Y2ggaHJlZj1cIi9wcm9qZWN0c1wiPlByb2plY3RzPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbjpmbHk9XCJ7eyB5OiAtMTUsIGR1cmF0aW9uOiA1MDAsIGRlbGF5OiA1MDAsIH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIntzZWdtZW50ID09PSAnZXhwZXJpZW5jZScgPyAnc2VsZWN0ZWQnIDogJyd9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cIm5hdi1pdGVtXCIgb246Y2xpY2s9e3NldEFjdGl2ZU5hdk9uQ2xpY2t9IHJlbD1wcmVmZXRjaCBocmVmPVwiL2V4cGVyaWVuY2VcIj5FeHBlcmllbmNlPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbjpmbHk9XCJ7eyB5OiAtMTUsIGR1cmF0aW9uOiA1MDAsIGRlbGF5OiA2MDAsIH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIntzaG93TW9kYWwgPyAnc2VsZWN0ZWQnIDogJyd9IG9wZW4tbW9kYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibmF2LWl0ZW1cIiBvbjpjbGljaz17b3Blbk1vZGFsfSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+Q29udGFjdDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vYmlsZS1ib3R0b21cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWN0YVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2V0IEluIFRvdWNoIVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwibWFpbHRvOmpvc2h1YS5taWNhaC5yb3BlckBnbWFpbC5jb21cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9zaHVhLm1pY2FoLnJvcGVyQGdtYWlsLmNvbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIDxUZXh0QW5pbWF0aW9uIHRleHQ9e2BKb3NodWEubWljYWgucm9wZXJAZ21haWwuY29tYH0gLz4gLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jdGFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZpZXcgUmVzdW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIuL3BkZnMvcmVzdW1lLWpvc2h1YS1yb3Blci5wZGZcIiBkb3dubG9hZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRG93bmxvYWQgUERGXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gPFRleHRBbmltYXRpb24gdGV4dD17YERvd25sb2FkIFBERmB9IC8+IC0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic29jaWFsLWljb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJzb2NpYWwtaWNvblwiIGhyZWY9XCJodHRwczovL3d3dy5naXRodWIuY29tL0pyb3BlMjFcIiBhcmlhLWxhYmVsPVwibGluayB0byBKb3NodWEgUm9wZXIncyBHaXRIdWIgYWNjb3VudFwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyXCIgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhYiBmYS1naXRodWJcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwic29jaWFsLWljb25cIiBocmVmPVwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL0pSLWRldlwiIGFyaWEtbGFiZWw9XCJsaW5rIHRvIEpvc2h1YSBSb3BlcidzIExpbmtlZEluIGFjY291bnRcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lclwiID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYWIgZmEtbGlua2VkaW5cIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwic29jaWFsLWljb25cIiBocmVmPVwibWFpbHRvOmpvc2h1YS5taWNhaC5yb3BlckBnbWFpbC5jb21cIiBhcmlhLWxhYmVsPVwibGluayB0byBzZW5kIEpvc2h1YSBSb3BlciBhbiBlbWFpbFwiID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtZW52ZWxvcGVcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICA8L25hdj5cbiAgICA8L2hlYWRlcj5cbnsvaWZ9XG5cbjxDb250YWN0TW9kYWwgb246Y2xpY2s9eygpID0+IHNob3dNb2RhbCA9IGZhbHNlfSBzaG93TW9kYWw9e3Nob3dNb2RhbH0vPiIsIjxzY3JpcHQ+XG4gICAgaW1wb3J0IENvbnRhY3RNb2RhbCBmcm9tICcuLi9jb21tb24tY29tcG9uZW50cy9tb2RhbHMvQ29udGFjdE1vZGFsLnN2ZWx0ZSc7XG4gICAgaW1wb3J0IFRleHRBbmltYXRpb24gZnJvbSAnLi4vY29tbW9uLWNvbXBvbmVudHMvVGV4dEFuaW1hdGlvbi5zdmVsdGUnO1xuXG4gICAgbGV0IHNob3dNb2RhbDtcblxuICAgIGZ1bmN0aW9uIG9wZW5Nb2RhbCgpe1xuICAgICAgICBzaG93TW9kYWwgPSB0cnVlO1xuICAgIH1cblxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuICAgIEBpbXBvcnQgJy4uLy4uL3N0eWxlcy9nbG9iYWwudmFyaWFibGVzLnNjc3MnO1xuICAgIGZvb3RlciB7XG4gICAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZDZkNmQ2O1xuICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICAgICAgY29sb3I6IGNvbG9yKHByaW1hcnkpO1xuICAgIH1cblxuICAgIC5mb290ZXItY29udGFpbmVyIHtcbiAgICAgICAgbWFyZ2luLXRvcDogNDBweDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDA7XG5cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQoc20pKSB7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLmxlZnQsIC5yaWdodCB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDU1cmVtO1xuXG4gICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiBicmVha3BvaW50KHNtKSkge1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogNjByZW07XG4gICAgICAgIH1cblxuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogYnJlYWtwb2ludChtZCkpIHtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDcwcmVtO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQoc20pKXtcbiAgICAgICAgLmJvdHRvbS1yb3cge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgfVxuICAgICAgICAubGVmdCwgLmNvcHlyaWdodHtcbiAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDgwcmVtO1xuICAgICAgICAgICAgd2lkdGg6IDYwJTtcbiAgICAgICAgfVxuICAgICAgICAucmlnaHQge1xuICAgICAgICAgICAgcGFkZGluZy10b3A6IDIwcmVtO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IGJyZWFrcG9pbnQobWQpKXtcbiAgICAgICAgLmxlZnQsIC5jb3B5cmlnaHQge1xuICAgICAgICAgICAgd2lkdGg6IDUwJTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC50ZXh0LWN0YTpmaXJzdC1vZi10eXBlIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjByZW07XG4gICAgfVxuXG4gICAgLmhlYWRsaW5lIHtcbiAgICAgICAgZm9udC1zaXplOiA0MHB4O1xuICAgICAgICBsaW5lLWhlaWdodDogNDVweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgbWF4LXdpZHRoOiA0MjBweDtcbiAgICB9XG5cbiAgICAuaGVhZGxpbmUgYSB7XG4gICAgICAgIC8vIGNvbG9yOiBjb2xvcihhY2NlbnQpO1xuICAgICAgICBjb2xvcjogIzRiNGI0YjtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIC8vIGxpbmUtaGVpZ2h0OiA7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtNXJlbTtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAtNXJlbTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogLTVyZW07XG4gICAgICAgIHBhZGRpbmc6IDAgNXJlbTtcbiAgICAgICAgdHJhbnNpdGlvbjogLjNzIGNvbG9yIGVhc2U7XG4gICAgICAgIC8vIHRyYW5zaXRpb246IGFsbCAuM3MgZWFzZS1pbi1vdXQ7XG4gICAgICAgIC8vIG9wYWNpdHk6IC43NTtcbiAgICB9XG5cbiAgICAuaGVhZGxpbmUgYTo6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAvLyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDAlLCAtNTAlKTtcbiAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC01MCUpO1xuICAgICAgICB3aWR0aDogY2FsYygxMDAlICsgMTRweCk7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtMTAlO1xuICAgICAgICBtYXJnaW4tdG9wOiA0cHg7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIGhlaWdodDogMTRweDtcbiAgICAgICAgYmFja2dyb3VuZDogI2MwYmRiZDtcbiAgICAgICAgei1pbmRleDogLTE7XG4gICAgICAgIG9wYWNpdHk6IC41O1xuICAgICAgICAvLyBib3JkZXItYm90dG9tOiAycHggc29saWQgIzNCM0IzQjtcbiAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIC40NXMgJGN1c3RvbV9hbmltYXRpb247XG4gICAgfVxuXG4gICAgLmhlYWRsaW5lIGE6aG92ZXI6OmFmdGVyIHtcbiAgICAgICAgXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDEwMC41JSwgLTUwJSk7XG4gICAgfVxuXG4gICAgLmhlYWRsaW5lIGE6aG92ZXIge1xuICAgICAgICBjb2xvcjogY29sb3IocHJpbWFyeSk7XG4gICAgfVxuXG4gICAgLy8gLmhlYWRsaW5lIGE6aG92ZXIge1xuICAgIC8vICAgICBjb2xvcjogYmxhY2s7XG4gICAgLy8gfVxuXG4gICAgLnRpdGxlIHtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDEwMDtcbiAgICAgICAgZm9udC1zaXplOiAxMnJlbTtcbiAgICB9XG5cbiAgICAudGV4dC1jdGEgYSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTRyZW07XG4gICAgfVxuXG4gICAgLmJvdHRvbS1yb3cge1xuICAgICAgICBwYWRkaW5nLXRvcDogMDtcbiAgICB9XG5cbiAgICAuY29weXJpZ2h0IHtcbiAgICAgICAgZm9udC1zaXplOiAxMnJlbTtcbiAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgICBmb250LXdlaWdodDogMzAwO1xuICAgIH1cblxuICAgIC5sZWZ0IC5vcGVuLW1vZGFsIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGNvbG9yOiBjb2xvcihzZWNvbmRhcnkpO1xuICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA4MDA7XG4gICAgICAgIG1hcmdpbi10b3A6IDI1cmVtO1xuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IC4zcyBlYXNlLWluLW91dDtcbiAgICB9XG5cbiAgICAubGVmdCAub3Blbi1tb2RhbDpob3ZlciB7XG4gICAgICAgIG9wYWNpdHk6IC43NTtcbiAgICB9XG5cbiAgICBkaXYuc29jaWFsLWljb25zIHtcbiAgICAgICAgbWFyZ2luLXRvcDogMTJweDtcbiAgICAgICAgbWluLXdpZHRoOiAyMDZweDtcbiAgICB9XG5cbiAgICBpIHtcbiAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6MTBweDtcbiAgICAgICAgY29sb3I6ICM4MDgwODA7XG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAuM3MgZWFzZTtcbiAgICB9XG5cbiAgICBhOmhvdmVyID4gaSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtM3B4KTtcbiAgICAgICAgY29sb3I6IGNvbG9yKHNlY29uZGFyeSk7XG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogYnJlYWtwb2ludChzbSkpIHtcbiAgICAgICAgZGl2LnNvY2lhbC1pY29ucyB7XG4gICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIH1cbiAgICAgICAgaXtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICAgICAgfVxuICAgICAgICAubGVmdCAub3Blbi1tb2RhbCB7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiA2MHJlbTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogYnJlYWtwb2ludChtZCkpe1xuICAgICAgICAudGl0bGV7XG4gICAgICAgICAgICBmb250LXNpemU6IDE2cmVtXG4gICAgICAgIH1cbiAgICAgICAgLnRleHQtY3RhIGEge1xuICAgICAgICAgICAgZm9udC1zaXplOiAxOHJlbTtcbiAgICAgICAgfVxuICAgICAgICAuY29weXJpZ2h0IHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRyZW07XG4gICAgICAgIH1cbiAgICAgICAgLmhlYWRsaW5lIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogNDVweDtcbiAgICAgICAgICAgIG1heC13aWR0aDogNDQwcHg7XG4gICAgICAgIH1cbiAgICAgICAgLmxlZnQgLm9wZW4tbW9kYWx7XG4gICAgICAgICAgICBmb250LXNpemU6IDIycHg7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiA3MHJlbTtcbiAgICAgICAgfVxuICAgICAgICBpIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgICAgfVxuICAgIH1cblxuPC9zdHlsZT5cblxuPGZvb3Rlcj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIGZvb3Rlci1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxlZnRcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiaGVhZGxpbmVcIj5cbiAgICAgICAgICAgICAgICBGZWVsIGZyZWUgdG8gc2hvb3QgbWUgYW4gPGEgaHJlZj1cIm1haWx0bzpqb3NodWEubWljYWgucm9wZXJAZ21haWwuY29tXCI+ZW1haWw8L2E+ICYgY29ubmVjdCB0aHJvdWdoIDxhIGhyZWY9XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vaW4vanItZGV2XCIgdGFyZ2V0PVwiYmxhbmtcIj5zb2NpYWwuPC9hPlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPGEgY2xhc3M9XCJvcGVuLW1vZGFsXCIgb246Y2xpY2s9e29wZW5Nb2RhbH0gaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPlJlYWNoIG91dCE8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmlnaHRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWN0YVwiPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgR2V0IEluIFRvdWNoIVxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwibWFpbHRvOmpvc2h1YS5taWNhaC5yb3BlckBnbWFpbC5jb21cIj5cbiAgICAgICAgICAgICAgICAgICAgPFRleHRBbmltYXRpb24gdGV4dD17YEpvc2h1YS5taWNhaC5yb3BlckBnbWFpbC5jb21gfSAvPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY3RhXCI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICBWaWV3IFJlc3VtZVxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiLi9wZGZzL3Jlc3VtZS1qb3NodWEtcm9wZXIucGRmXCIgZG93bmxvYWQ+XG4gICAgICAgICAgICAgICAgICAgIDxUZXh0QW5pbWF0aW9uIHRleHQ9e2BEb3dubG9hZCBQREZgfSAvPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYm90dG9tLXJvdyBjb250YWluZXJcIj5cbiAgICAgICAgXG4gICAgICAgIDxwIGNsYXNzPVwiY29weXJpZ2h0XCI+QCB7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfSBKb3NodWEgUm9wZXIgRGV2ZWxvcG1lbnQ8L3A+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzb2NpYWwtaWNvbnNcIj5cbiAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL3d3dy5naXRodWIuY29tL0pyb3BlMjFcIiBhcmlhLWxhYmVsPVwibGluayB0byBKb3NodWEgUm9wZXIncyBHaXRIdWIgYWNjb3VudFwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyXCIgPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFiIGZhLWdpdGh1YlwiPjwvaT5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vaW4vSlItZGV2XCIgYXJpYS1sYWJlbD1cImxpbmsgdG8gSm9zaHVhIFJvcGVyJ3MgTGlua2VkSW4gYWNjb3VudFwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyXCIgPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFiIGZhLWxpbmtlZGluXCI+PC9pPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPGEgaHJlZj1cIm1haWx0bzpqb3NodWEubWljYWgucm9wZXJAZ21haWwuY29tXCIgYXJpYS1sYWJlbD1cImxpbmsgdG8gc2VuZCBKb3NodWEgUm9wZXIgYW4gZW1haWxcIiA+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtZW52ZWxvcGVcIj48L2k+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9mb290ZXI+XG5cbjxDb250YWN0TW9kYWwgb246Y2xpY2s9eygpID0+IHNob3dNb2RhbCA9IGZhbHNlfSBzaG93TW9kYWw9e3Nob3dNb2RhbH0vPiIsIjxzY3JpcHQ+XG5pbXBvcnQgTG9nbyBmcm9tICcuL25hdmlnYXRpb24vTG9nby5zdmVsdGUnO1xuaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gJ3N2ZWx0ZSc7XG5cbmltcG9ydCB7IGRyYXcsIGZhZGUsIGJsdXIsIHNsaWRlLCBzY2FsZSB9IGZyb20gJ3N2ZWx0ZS90cmFuc2l0aW9uJztcbmltcG9ydCB7IHF1aW50T3V0LCBxdWFydEluT3V0IH0gZnJvbSAnc3ZlbHRlL2Vhc2luZyc7XG5cbmxldCB2aXNpYmxlID0gdHJ1ZTtcblxub25Nb3VudCgoKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHZpc2libGUgPSBmYWxzZTtcbiAgICB9LCAzNzUwKVxufSlcblxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbiAgICBzZWN0aW9uIHtcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICB6LWluZGV4OiAxMDAwMDtcbiAgICAgICAgLyogYmFja2dyb3VuZDogd2hpdGU7ICovXG4gICAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgIH1cblxuICAgIC5iYWNrZ3JvdW5kIHtcblx0XHRiYWNrZ3JvdW5kOiB1cmwoJy4uL2JhY2tncm91bmQtaW1hZ2VzL3NvLXdoaXRlLnBuZycpO1xuXHRcdHBvc2l0aW9uOiBmaXhlZDtcblx0XHR3aWR0aDogMTAwdnc7XG5cdFx0aGVpZ2h0OiAxMDB2aDtcblx0XHR0b3A6IDA7XG5cdFx0bGVmdDogMDtcblx0XHR6LWluZGV4OiAtMTtcblx0fVxuPC9zdHlsZT5cblxuPHN2ZWx0ZTpib2R5IGNsYXNzPXsnb3ZlcmZsb3cnfSAvPlxuPHN2ZWx0ZTpoZWFkPlxuICAgIHsjaWYgdmlzaWJsZX1cbiAgICAgICAgPHN0eWxlPlxuICAgICAgICAgICAgYm9keSB7XG4gICAgICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgPC9zdHlsZT5cbiAgICB7L2lmfVxuPC9zdmVsdGU6aGVhZD5cblxueyNpZiB2aXNpYmxlfVxuICAgIDxzZWN0aW9uIG91dDpmYWRlPVwie3tkdXJhdGlvbjogNTAwLCBkZWxheTogMjUwLCBlYXNpbmc6IHF1YXJ0SW5PdXR9fVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImJhY2tncm91bmRcIj48L3NwYW4+XG4gICAgICAgIDxMb2dvIGVuYWJsZUZ1bGxBbmltYXRpb249e3RydWV9IC8+XG4gICAgPC9zZWN0aW9uPlxuey9pZn0iLCI8c2NyaXB0PlxuXHRpbXBvcnQgeyBzdG9yZXMgfSBmcm9tIFwiQHNhcHBlci9hcHBcIjtcblx0IGltcG9ydCB7IG9uTW91bnQgfSBmcm9tICdzdmVsdGUnXG5cdGltcG9ydCB7IGZhZGUsIGZseSB9IGZyb20gJ3N2ZWx0ZS90cmFuc2l0aW9uJztcblx0Ly8gaW1wb3J0IEdvb2dsZUFuYWx5dGljcyBmcm9tICcuLi9jb21wb25lbnRzL2hlbHBlci1jb21wb25lbnRzL0dvb2dsZUFuYWx5dGljcy5zdmVsdGUnO1xuXHRpbXBvcnQgTmF2aWdhdGlvbiBmcm9tICcuLi9jb21wb25lbnRzL2dsb2JhbC1jb21wb25lbnRzL25hdmlnYXRpb24vTmF2aWdhdGlvbi5zdmVsdGUnO1xuXHRpbXBvcnQgRm9vdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvZ2xvYmFsLWNvbXBvbmVudHMvRm9vdGVyLnN2ZWx0ZSc7XG5cdGltcG9ydCBGaXJzdExvYWRQYWdlQW5pbWF0aW9uIGZyb20gJy4uL2NvbXBvbmVudHMvZ2xvYmFsLWNvbXBvbmVudHMvRmlyc3RMb2FkUGFnZUFuaW1hdGlvbi5zdmVsdGUnO1xuXG5cdGV4cG9ydCBsZXQgc2VnbWVudDtcblx0bGV0IHZpc2libGUgPSBmYWxzZTtcblx0bGV0IGZpbmlzaGVkTG9hZFBhZ2UgPSBmYWxzZTtcblxuXHRvbk1vdW50KCgpID0+IHtcblx0XHR2aXNpYmxlID0gdHJ1ZTtcblxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0ZmluaXNoZWRMb2FkUGFnZSA9IHRydWU7XG5cdFx0fSwgNDAwMClcblx0fSlcblx0XG5cdC8vIGxldCBnYV9pZCA9ICdVQS04OTA1ODE1Ni0yJztcbjwvc2NyaXB0PlxuXG48c3R5bGUgZ2xvYmFsIGxhbmc9XCJzY3NzXCI+XG5cdEBpbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWwuc3R5bGVzLnNjc3MnO1xuXHQuYmFja2dyb3VuZCB7XG5cdFx0YmFja2dyb3VuZDogdXJsKCcuLi9iYWNrZ3JvdW5kLWltYWdlcy9zby13aGl0ZS5wbmcnKTtcblx0XHRwb3NpdGlvbjogZml4ZWQ7XG5cdFx0d2lkdGg6IDEwMHZ3O1xuXHRcdGhlaWdodDogMTAwdmg7XG5cdFx0dG9wOiAwO1xuXHRcdGxlZnQ6IDA7XG5cdFx0ei1pbmRleDogLTE7XG5cdH1cblxuPC9zdHlsZT5cblxuPCEtLSA8R29vZ2xlQW5hbHl0aWNzIHtzdG9yZXN9IGlkPXtnYV9pZH0gLz4gLS0+XG5cbjxOYXZpZ2F0aW9uIHNlZ21lbnQ9e3NlZ21lbnR9IGxvYWRDb21wb25lbnRzPXtmaW5pc2hlZExvYWRQYWdlfSAvPlxuXG48ZGl2IGNsYXNzPVwiYmFja2dyb3VuZFwiPjwvZGl2PlxuPEZpcnN0TG9hZFBhZ2VBbmltYXRpb24gLz5cbjxtYWluPlxuXHR7I2lmIGZpbmlzaGVkTG9hZFBhZ2V9XG5cdFx0PHNsb3Q+PC9zbG90PlxuXHR7L2lmfVxuPC9tYWluPlxuPEZvb3RlciAvPiIsIjxzY3JpcHQ+XG5cdGV4cG9ydCBsZXQgc3RhdHVzO1xuXHRleHBvcnQgbGV0IGVycm9yO1xuXG5cdGNvbnN0IGRldiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblx0aDEsIHAge1xuXHRcdG1hcmdpbjogMCBhdXRvO1xuXHR9XG5cblx0aDEge1xuXHRcdGZvbnQtc2l6ZTogMi44ZW07XG5cdFx0Zm9udC13ZWlnaHQ6IDcwMDtcblx0XHRtYXJnaW46IDAgMCAwLjVlbSAwO1xuXHR9XG5cblx0cCB7XG5cdFx0bWFyZ2luOiAxZW0gYXV0bztcblx0fVxuXG5cdEBtZWRpYSAobWluLXdpZHRoOiA0ODBweCkge1xuXHRcdGgxIHtcblx0XHRcdGZvbnQtc2l6ZTogNGVtO1xuXHRcdH1cblx0fVxuPC9zdHlsZT5cblxuPHN2ZWx0ZTpoZWFkPlxuXHQ8dGl0bGU+e3N0YXR1c308L3RpdGxlPlxuPC9zdmVsdGU6aGVhZD5cblxuPGgxPntzdGF0dXN9PC9oMT5cblxuPHA+e2Vycm9yLm1lc3NhZ2V9PC9wPlxuXG57I2lmIGRldiAmJiBlcnJvci5zdGFja31cblx0PHByZT57ZXJyb3Iuc3RhY2t9PC9wcmU+XG57L2lmfVxuIiwiPCEtLSBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IFNhcHBlciDigJQgZG8gbm90IGVkaXQgaXQhIC0tPlxuPHNjcmlwdD5cblx0aW1wb3J0IHsgc2V0Q29udGV4dCwgYWZ0ZXJVcGRhdGUgfSBmcm9tICdzdmVsdGUnO1xuXHRpbXBvcnQgeyBDT05URVhUX0tFWSB9IGZyb20gJy4vc2hhcmVkJztcblx0aW1wb3J0IExheW91dCBmcm9tICcuLi8uLi8uLi9yb3V0ZXMvX2xheW91dC5zdmVsdGUnO1xuXHRpbXBvcnQgRXJyb3IgZnJvbSAnLi4vLi4vLi4vcm91dGVzL19lcnJvci5zdmVsdGUnO1xuXG5cdGV4cG9ydCBsZXQgc3RvcmVzO1xuXHRleHBvcnQgbGV0IGVycm9yO1xuXHRleHBvcnQgbGV0IHN0YXR1cztcblx0ZXhwb3J0IGxldCBzZWdtZW50cztcblx0ZXhwb3J0IGxldCBsZXZlbDA7XG5cdGV4cG9ydCBsZXQgbGV2ZWwxID0gbnVsbDtcblx0ZXhwb3J0IGxldCBub3RpZnk7XG5cblx0YWZ0ZXJVcGRhdGUobm90aWZ5KTtcblx0c2V0Q29udGV4dChDT05URVhUX0tFWSwgc3RvcmVzKTtcbjwvc2NyaXB0PlxuXG48TGF5b3V0IHNlZ21lbnQ9XCJ7c2VnbWVudHNbMF19XCIgey4uLmxldmVsMC5wcm9wc30+XG5cdHsjaWYgZXJyb3J9XG5cdFx0PEVycm9yIHtlcnJvcn0ge3N0YXR1c30vPlxuXHR7OmVsc2V9XG5cdFx0PHN2ZWx0ZTpjb21wb25lbnQgdGhpcz1cIntsZXZlbDEuY29tcG9uZW50fVwiIHsuLi5sZXZlbDEucHJvcHN9Lz5cblx0ey9pZn1cbjwvTGF5b3V0PiIsIi8vIFRoaXMgZmlsZSBpcyBnZW5lcmF0ZWQgYnkgU2FwcGVyIOKAlCBkbyBub3QgZWRpdCBpdCFcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUm9vdCB9IGZyb20gJy4uLy4uLy4uL3JvdXRlcy9fbGF5b3V0LnN2ZWx0ZSc7XG5leHBvcnQgeyBwcmVsb2FkIGFzIHJvb3RfcHJlbG9hZCB9IGZyb20gJy4vc2hhcmVkJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRXJyb3JDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9yb3V0ZXMvX2Vycm9yLnN2ZWx0ZSc7XG5cbmV4cG9ydCBjb25zdCBpZ25vcmUgPSBbXTtcblxuZXhwb3J0IGNvbnN0IGNvbXBvbmVudHMgPSBbXG5cdHtcblx0XHRqczogKCkgPT4gaW1wb3J0KFwiLi4vLi4vLi4vcm91dGVzL2luZGV4LnN2ZWx0ZVwiKSxcblx0XHRjc3M6IFwiX19TQVBQRVJfQ1NTX1BMQUNFSE9MREVSOmluZGV4LnN2ZWx0ZV9fXCJcblx0fSxcblx0e1xuXHRcdGpzOiAoKSA9PiBpbXBvcnQoXCIuLi8uLi8uLi9yb3V0ZXMvZXhwZXJpZW5jZS5zdmVsdGVcIiksXG5cdFx0Y3NzOiBcIl9fU0FQUEVSX0NTU19QTEFDRUhPTERFUjpleHBlcmllbmNlLnN2ZWx0ZV9fXCJcblx0fSxcblx0e1xuXHRcdGpzOiAoKSA9PiBpbXBvcnQoXCIuLi8uLi8uLi9yb3V0ZXMvcHJvamVjdHMvY3JlYXRpdmUtcmV2b2x0LnN2ZWx0ZVwiKSxcblx0XHRjc3M6IFwiX19TQVBQRVJfQ1NTX1BMQUNFSE9MREVSOnByb2plY3RzL2NyZWF0aXZlLXJldm9sdC5zdmVsdGVfX1wiXG5cdH0sXG5cdHtcblx0XHRqczogKCkgPT4gaW1wb3J0KFwiLi4vLi4vLi4vcm91dGVzL3Byb2plY3RzL3VuaXZlcnNpdHktcGFyay5zdmVsdGVcIiksXG5cdFx0Y3NzOiBcIl9fU0FQUEVSX0NTU19QTEFDRUhPTERFUjpwcm9qZWN0cy91bml2ZXJzaXR5LXBhcmsuc3ZlbHRlX19cIlxuXHR9LFxuXHR7XG5cdFx0anM6ICgpID0+IGltcG9ydChcIi4uLy4uLy4uL3JvdXRlcy9wcm9qZWN0cy9kaS1yZXBhaXJzLnN2ZWx0ZVwiKSxcblx0XHRjc3M6IFwiX19TQVBQRVJfQ1NTX1BMQUNFSE9MREVSOnByb2plY3RzL2RpLXJlcGFpcnMuc3ZlbHRlX19cIlxuXHR9LFxuXHR7XG5cdFx0anM6ICgpID0+IGltcG9ydChcIi4uLy4uLy4uL3JvdXRlcy9wcm9qZWN0cy9zdGFsbGlvbi5zdmVsdGVcIiksXG5cdFx0Y3NzOiBcIl9fU0FQUEVSX0NTU19QTEFDRUhPTERFUjpwcm9qZWN0cy9zdGFsbGlvbi5zdmVsdGVfX1wiXG5cdH0sXG5cdHtcblx0XHRqczogKCkgPT4gaW1wb3J0KFwiLi4vLi4vLi4vcm91dGVzL3Byb2plY3RzL2hhbGN5b24uc3ZlbHRlXCIpLFxuXHRcdGNzczogXCJfX1NBUFBFUl9DU1NfUExBQ0VIT0xERVI6cHJvamVjdHMvaGFsY3lvbi5zdmVsdGVfX1wiXG5cdH0sXG5cdHtcblx0XHRqczogKCkgPT4gaW1wb3J0KFwiLi4vLi4vLi4vcm91dGVzL3Byb2plY3RzLnN2ZWx0ZVwiKSxcblx0XHRjc3M6IFwiX19TQVBQRVJfQ1NTX1BMQUNFSE9MREVSOnByb2plY3RzLnN2ZWx0ZV9fXCJcblx0fSxcblx0e1xuXHRcdGpzOiAoKSA9PiBpbXBvcnQoXCIuLi8uLi8uLi9yb3V0ZXMvYWJvdXQuc3ZlbHRlXCIpLFxuXHRcdGNzczogXCJfX1NBUFBFUl9DU1NfUExBQ0VIT0xERVI6YWJvdXQuc3ZlbHRlX19cIlxuXHR9XG5dO1xuXG5leHBvcnQgY29uc3Qgcm91dGVzID0gW1xuXHR7XG5cdFx0Ly8gaW5kZXguc3ZlbHRlXG5cdFx0cGF0dGVybjogL15cXC8kLyxcblx0XHRwYXJ0czogW1xuXHRcdFx0eyBpOiAwIH1cblx0XHRdXG5cdH0sXG5cblx0e1xuXHRcdC8vIGV4cGVyaWVuY2Uuc3ZlbHRlXG5cdFx0cGF0dGVybjogL15cXC9leHBlcmllbmNlXFwvPyQvLFxuXHRcdHBhcnRzOiBbXG5cdFx0XHR7IGk6IDEgfVxuXHRcdF1cblx0fSxcblxuXHR7XG5cdFx0Ly8gcHJvamVjdHMvY3JlYXRpdmUtcmV2b2x0LnN2ZWx0ZVxuXHRcdHBhdHRlcm46IC9eXFwvcHJvamVjdHNcXC9jcmVhdGl2ZS1yZXZvbHRcXC8/JC8sXG5cdFx0cGFydHM6IFtcblx0XHRcdG51bGwsXG5cdFx0XHR7IGk6IDIgfVxuXHRcdF1cblx0fSxcblxuXHR7XG5cdFx0Ly8gcHJvamVjdHMvdW5pdmVyc2l0eS1wYXJrLnN2ZWx0ZVxuXHRcdHBhdHRlcm46IC9eXFwvcHJvamVjdHNcXC91bml2ZXJzaXR5LXBhcmtcXC8/JC8sXG5cdFx0cGFydHM6IFtcblx0XHRcdG51bGwsXG5cdFx0XHR7IGk6IDMgfVxuXHRcdF1cblx0fSxcblxuXHR7XG5cdFx0Ly8gcHJvamVjdHMvZGktcmVwYWlycy5zdmVsdGVcblx0XHRwYXR0ZXJuOiAvXlxcL3Byb2plY3RzXFwvZGktcmVwYWlyc1xcLz8kLyxcblx0XHRwYXJ0czogW1xuXHRcdFx0bnVsbCxcblx0XHRcdHsgaTogNCB9XG5cdFx0XVxuXHR9LFxuXG5cdHtcblx0XHQvLyBwcm9qZWN0cy9zdGFsbGlvbi5zdmVsdGVcblx0XHRwYXR0ZXJuOiAvXlxcL3Byb2plY3RzXFwvc3RhbGxpb25cXC8/JC8sXG5cdFx0cGFydHM6IFtcblx0XHRcdG51bGwsXG5cdFx0XHR7IGk6IDUgfVxuXHRcdF1cblx0fSxcblxuXHR7XG5cdFx0Ly8gcHJvamVjdHMvaGFsY3lvbi5zdmVsdGVcblx0XHRwYXR0ZXJuOiAvXlxcL3Byb2plY3RzXFwvaGFsY3lvblxcLz8kLyxcblx0XHRwYXJ0czogW1xuXHRcdFx0bnVsbCxcblx0XHRcdHsgaTogNiB9XG5cdFx0XVxuXHR9LFxuXG5cdHtcblx0XHQvLyBwcm9qZWN0cy5zdmVsdGVcblx0XHRwYXR0ZXJuOiAvXlxcL3Byb2plY3RzXFwvPyQvLFxuXHRcdHBhcnRzOiBbXG5cdFx0XHR7IGk6IDcgfVxuXHRcdF1cblx0fSxcblxuXHR7XG5cdFx0Ly8gYWJvdXQuc3ZlbHRlXG5cdFx0cGF0dGVybjogL15cXC9hYm91dFxcLz8kLyxcblx0XHRwYXJ0czogW1xuXHRcdFx0eyBpOiA4IH1cblx0XHRdXG5cdH1cbl07XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuXHRpbXBvcnQoXCIvVXNlcnMvam9zaHJvcGVyL0Rlc2t0b3AvcmVwb3MvcG9ydGZvbGlvLXN2ZWx0ZS9ub2RlX21vZHVsZXMvc2FwcGVyL3NhcHBlci1kZXYtY2xpZW50LmpzXCIpLnRoZW4oY2xpZW50ID0+IHtcblx0XHRjbGllbnQuY29ubmVjdCgxMDAwMCk7XG5cdH0pO1xufSIsImltcG9ydCB7IGdldENvbnRleHQgfSBmcm9tICdzdmVsdGUnO1xuaW1wb3J0IHsgQ09OVEVYVF9LRVkgfSBmcm9tICcuL2ludGVybmFsL3NoYXJlZCc7XG5pbXBvcnQgeyB3cml0YWJsZSB9IGZyb20gJ3N2ZWx0ZS9zdG9yZSc7XG5pbXBvcnQgQXBwIGZyb20gJy4vaW50ZXJuYWwvQXBwLnN2ZWx0ZSc7XG5pbXBvcnQgeyBpZ25vcmUsIHJvdXRlcywgcm9vdF9wcmVsb2FkLCBjb21wb25lbnRzLCBFcnJvckNvbXBvbmVudCB9IGZyb20gJy4vaW50ZXJuYWwvbWFuaWZlc3QtY2xpZW50JztcblxuZnVuY3Rpb24gZ290byhocmVmLCBvcHRzID0geyByZXBsYWNlU3RhdGU6IGZhbHNlIH0pIHtcblx0Y29uc3QgdGFyZ2V0ID0gc2VsZWN0X3RhcmdldChuZXcgVVJMKGhyZWYsIGRvY3VtZW50LmJhc2VVUkkpKTtcblxuXHRpZiAodGFyZ2V0KSB7XG5cdFx0X2hpc3Rvcnlbb3B0cy5yZXBsYWNlU3RhdGUgPyAncmVwbGFjZVN0YXRlJyA6ICdwdXNoU3RhdGUnXSh7IGlkOiBjaWQgfSwgJycsIGhyZWYpO1xuXHRcdHJldHVybiBuYXZpZ2F0ZSh0YXJnZXQsIG51bGwpLnRoZW4oKCkgPT4ge30pO1xuXHR9XG5cblx0bG9jYXRpb24uaHJlZiA9IGhyZWY7XG5cdHJldHVybiBuZXcgUHJvbWlzZShmID0+IHt9KTsgLy8gbmV2ZXIgcmVzb2x2ZXNcbn1cblxuLyoqIENhbGxiYWNrIHRvIGluZm9ybSBvZiBhIHZhbHVlIHVwZGF0ZXMuICovXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbmZ1bmN0aW9uIHBhZ2Vfc3RvcmUodmFsdWUpIHtcblx0Y29uc3Qgc3RvcmUgPSB3cml0YWJsZSh2YWx1ZSk7XG5cdGxldCByZWFkeSA9IHRydWU7XG5cblx0ZnVuY3Rpb24gbm90aWZ5KCkge1xuXHRcdHJlYWR5ID0gdHJ1ZTtcblx0XHRzdG9yZS51cGRhdGUodmFsID0+IHZhbCk7XG5cdH1cblxuXHRmdW5jdGlvbiBzZXQobmV3X3ZhbHVlKSB7XG5cdFx0cmVhZHkgPSBmYWxzZTtcblx0XHRzdG9yZS5zZXQobmV3X3ZhbHVlKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHN1YnNjcmliZShydW4pIHtcblx0XHRsZXQgb2xkX3ZhbHVlO1xuXHRcdHJldHVybiBzdG9yZS5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG5cdFx0XHRpZiAob2xkX3ZhbHVlID09PSB1bmRlZmluZWQgfHwgKHJlYWR5ICYmIHZhbHVlICE9PSBvbGRfdmFsdWUpKSB7XG5cdFx0XHRcdHJ1bihvbGRfdmFsdWUgPSB2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4geyBub3RpZnksIHNldCwgc3Vic2NyaWJlIH07XG59XG5cbmNvbnN0IGluaXRpYWxfZGF0YSA9IHR5cGVvZiBfX1NBUFBFUl9fICE9PSAndW5kZWZpbmVkJyAmJiBfX1NBUFBFUl9fO1xuXG5sZXQgcmVhZHkgPSBmYWxzZTtcbmxldCByb290X2NvbXBvbmVudDtcbmxldCBjdXJyZW50X3Rva2VuO1xubGV0IHJvb3RfcHJlbG9hZGVkO1xubGV0IGN1cnJlbnRfYnJhbmNoID0gW107XG5sZXQgY3VycmVudF9xdWVyeSA9ICd7fSc7XG5cbmNvbnN0IHN0b3JlcyA9IHtcblx0cGFnZTogcGFnZV9zdG9yZSh7fSksXG5cdHByZWxvYWRpbmc6IHdyaXRhYmxlKG51bGwpLFxuXHRzZXNzaW9uOiB3cml0YWJsZShpbml0aWFsX2RhdGEgJiYgaW5pdGlhbF9kYXRhLnNlc3Npb24pXG59O1xuXG5sZXQgJHNlc3Npb247XG5sZXQgc2Vzc2lvbl9kaXJ0eTtcblxuc3RvcmVzLnNlc3Npb24uc3Vic2NyaWJlKGFzeW5jIHZhbHVlID0+IHtcblx0JHNlc3Npb24gPSB2YWx1ZTtcblxuXHRpZiAoIXJlYWR5KSByZXR1cm47XG5cdHNlc3Npb25fZGlydHkgPSB0cnVlO1xuXG5cdGNvbnN0IHRhcmdldCA9IHNlbGVjdF90YXJnZXQobmV3IFVSTChsb2NhdGlvbi5ocmVmKSk7XG5cblx0Y29uc3QgdG9rZW4gPSBjdXJyZW50X3Rva2VuID0ge307XG5cdGNvbnN0IHsgcmVkaXJlY3QsIHByb3BzLCBicmFuY2ggfSA9IGF3YWl0IGh5ZHJhdGVfdGFyZ2V0KHRhcmdldCk7XG5cdGlmICh0b2tlbiAhPT0gY3VycmVudF90b2tlbikgcmV0dXJuOyAvLyBhIHNlY29uZGFyeSBuYXZpZ2F0aW9uIGhhcHBlbmVkIHdoaWxlIHdlIHdlcmUgbG9hZGluZ1xuXG5cdGF3YWl0IHJlbmRlcihyZWRpcmVjdCwgYnJhbmNoLCBwcm9wcywgdGFyZ2V0LnBhZ2UpO1xufSk7XG5cbmxldCBwcmVmZXRjaGluZ1xuXG5cbiA9IG51bGw7XG5mdW5jdGlvbiBzZXRfcHJlZmV0Y2hpbmcoaHJlZiwgcHJvbWlzZSkge1xuXHRwcmVmZXRjaGluZyA9IHsgaHJlZiwgcHJvbWlzZSB9O1xufVxuXG5sZXQgdGFyZ2V0O1xuZnVuY3Rpb24gc2V0X3RhcmdldChlbGVtZW50KSB7XG5cdHRhcmdldCA9IGVsZW1lbnQ7XG59XG5cbmxldCB1aWQgPSAxO1xuZnVuY3Rpb24gc2V0X3VpZChuKSB7XG5cdHVpZCA9IG47XG59XG5cbmxldCBjaWQ7XG5mdW5jdGlvbiBzZXRfY2lkKG4pIHtcblx0Y2lkID0gbjtcbn1cblxuY29uc3QgX2hpc3RvcnkgPSB0eXBlb2YgaGlzdG9yeSAhPT0gJ3VuZGVmaW5lZCcgPyBoaXN0b3J5IDoge1xuXHRwdXNoU3RhdGU6IChzdGF0ZSwgdGl0bGUsIGhyZWYpID0+IHt9LFxuXHRyZXBsYWNlU3RhdGU6IChzdGF0ZSwgdGl0bGUsIGhyZWYpID0+IHt9LFxuXHRzY3JvbGxSZXN0b3JhdGlvbjogJydcbn07XG5cbmNvbnN0IHNjcm9sbF9oaXN0b3J5ID0ge307XG5cbmZ1bmN0aW9uIGV4dHJhY3RfcXVlcnkoc2VhcmNoKSB7XG5cdGNvbnN0IHF1ZXJ5ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblx0aWYgKHNlYXJjaC5sZW5ndGggPiAwKSB7XG5cdFx0c2VhcmNoLnNsaWNlKDEpLnNwbGl0KCcmJykuZm9yRWFjaChzZWFyY2hQYXJhbSA9PiB7XG5cdFx0XHRsZXQgWywga2V5LCB2YWx1ZSA9ICcnXSA9IC8oW149XSopKD86PSguKikpPy8uZXhlYyhkZWNvZGVVUklDb21wb25lbnQoc2VhcmNoUGFyYW0ucmVwbGFjZSgvXFwrL2csICcgJykpKTtcblx0XHRcdGlmICh0eXBlb2YgcXVlcnlba2V5XSA9PT0gJ3N0cmluZycpIHF1ZXJ5W2tleV0gPSBbcXVlcnlba2V5XV07XG5cdFx0XHRpZiAodHlwZW9mIHF1ZXJ5W2tleV0gPT09ICdvYmplY3QnKSAocXVlcnlba2V5XSApLnB1c2godmFsdWUpO1xuXHRcdFx0ZWxzZSBxdWVyeVtrZXldID0gdmFsdWU7XG5cdFx0fSk7XG5cdH1cblx0cmV0dXJuIHF1ZXJ5O1xufVxuXG5mdW5jdGlvbiBzZWxlY3RfdGFyZ2V0KHVybCkge1xuXHRpZiAodXJsLm9yaWdpbiAhPT0gbG9jYXRpb24ub3JpZ2luKSByZXR1cm4gbnVsbDtcblx0aWYgKCF1cmwucGF0aG5hbWUuc3RhcnRzV2l0aChpbml0aWFsX2RhdGEuYmFzZVVybCkpIHJldHVybiBudWxsO1xuXG5cdGxldCBwYXRoID0gdXJsLnBhdGhuYW1lLnNsaWNlKGluaXRpYWxfZGF0YS5iYXNlVXJsLmxlbmd0aCk7XG5cblx0aWYgKHBhdGggPT09ICcnKSB7XG5cdFx0cGF0aCA9ICcvJztcblx0fVxuXG5cdC8vIGF2b2lkIGFjY2lkZW50YWwgY2xhc2hlcyBiZXR3ZWVuIHNlcnZlciByb3V0ZXMgYW5kIHBhZ2Ugcm91dGVzXG5cdGlmIChpZ25vcmUuc29tZShwYXR0ZXJuID0+IHBhdHRlcm4udGVzdChwYXRoKSkpIHJldHVybjtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHJvdXRlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdGNvbnN0IHJvdXRlID0gcm91dGVzW2ldO1xuXG5cdFx0Y29uc3QgbWF0Y2ggPSByb3V0ZS5wYXR0ZXJuLmV4ZWMocGF0aCk7XG5cblx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdGNvbnN0IHF1ZXJ5ID0gZXh0cmFjdF9xdWVyeSh1cmwuc2VhcmNoKTtcblx0XHRcdGNvbnN0IHBhcnQgPSByb3V0ZS5wYXJ0c1tyb3V0ZS5wYXJ0cy5sZW5ndGggLSAxXTtcblx0XHRcdGNvbnN0IHBhcmFtcyA9IHBhcnQucGFyYW1zID8gcGFydC5wYXJhbXMobWF0Y2gpIDoge307XG5cblx0XHRcdGNvbnN0IHBhZ2UgPSB7IGhvc3Q6IGxvY2F0aW9uLmhvc3QsIHBhdGgsIHF1ZXJ5LCBwYXJhbXMgfTtcblxuXHRcdFx0cmV0dXJuIHsgaHJlZjogdXJsLmhyZWYsIHJvdXRlLCBtYXRjaCwgcGFnZSB9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IodXJsKSB7XG5cdGNvbnN0IHsgaG9zdCwgcGF0aG5hbWUsIHNlYXJjaCB9ID0gbG9jYXRpb247XG5cdGNvbnN0IHsgc2Vzc2lvbiwgcHJlbG9hZGVkLCBzdGF0dXMsIGVycm9yIH0gPSBpbml0aWFsX2RhdGE7XG5cblx0aWYgKCFyb290X3ByZWxvYWRlZCkge1xuXHRcdHJvb3RfcHJlbG9hZGVkID0gcHJlbG9hZGVkICYmIHByZWxvYWRlZFswXTtcblx0fVxuXG5cdGNvbnN0IHByb3BzID0ge1xuXHRcdGVycm9yLFxuXHRcdHN0YXR1cyxcblx0XHRzZXNzaW9uLFxuXHRcdGxldmVsMDoge1xuXHRcdFx0cHJvcHM6IHJvb3RfcHJlbG9hZGVkXG5cdFx0fSxcblx0XHRsZXZlbDE6IHtcblx0XHRcdHByb3BzOiB7XG5cdFx0XHRcdHN0YXR1cyxcblx0XHRcdFx0ZXJyb3Jcblx0XHRcdH0sXG5cdFx0XHRjb21wb25lbnQ6IEVycm9yQ29tcG9uZW50XG5cdFx0fSxcblx0XHRzZWdtZW50czogcHJlbG9hZGVkXG5cblx0fTtcblx0Y29uc3QgcXVlcnkgPSBleHRyYWN0X3F1ZXJ5KHNlYXJjaCk7XG5cdHJlbmRlcihudWxsLCBbXSwgcHJvcHMsIHsgaG9zdCwgcGF0aDogcGF0aG5hbWUsIHF1ZXJ5LCBwYXJhbXM6IHt9IH0pO1xufVxuXG5mdW5jdGlvbiBzY3JvbGxfc3RhdGUoKSB7XG5cdHJldHVybiB7XG5cdFx0eDogcGFnZVhPZmZzZXQsXG5cdFx0eTogcGFnZVlPZmZzZXRcblx0fTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbmF2aWdhdGUodGFyZ2V0LCBpZCwgbm9zY3JvbGwsIGhhc2gpIHtcblx0aWYgKGlkKSB7XG5cdFx0Ly8gcG9wc3RhdGUgb3IgaW5pdGlhbCBuYXZpZ2F0aW9uXG5cdFx0Y2lkID0gaWQ7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgY3VycmVudF9zY3JvbGwgPSBzY3JvbGxfc3RhdGUoKTtcblxuXHRcdC8vIGNsaWNrZWQgb24gYSBsaW5rLiBwcmVzZXJ2ZSBzY3JvbGwgc3RhdGVcblx0XHRzY3JvbGxfaGlzdG9yeVtjaWRdID0gY3VycmVudF9zY3JvbGw7XG5cblx0XHRpZCA9IGNpZCA9ICsrdWlkO1xuXHRcdHNjcm9sbF9oaXN0b3J5W2NpZF0gPSBub3Njcm9sbCA/IGN1cnJlbnRfc2Nyb2xsIDogeyB4OiAwLCB5OiAwIH07XG5cdH1cblxuXHRjaWQgPSBpZDtcblxuXHRpZiAocm9vdF9jb21wb25lbnQpIHN0b3Jlcy5wcmVsb2FkaW5nLnNldCh0cnVlKTtcblxuXHRjb25zdCBsb2FkZWQgPSBwcmVmZXRjaGluZyAmJiBwcmVmZXRjaGluZy5ocmVmID09PSB0YXJnZXQuaHJlZiA/XG5cdFx0cHJlZmV0Y2hpbmcucHJvbWlzZSA6XG5cdFx0aHlkcmF0ZV90YXJnZXQodGFyZ2V0KTtcblxuXHRwcmVmZXRjaGluZyA9IG51bGw7XG5cblx0Y29uc3QgdG9rZW4gPSBjdXJyZW50X3Rva2VuID0ge307XG5cdGNvbnN0IHsgcmVkaXJlY3QsIHByb3BzLCBicmFuY2ggfSA9IGF3YWl0IGxvYWRlZDtcblx0aWYgKHRva2VuICE9PSBjdXJyZW50X3Rva2VuKSByZXR1cm47IC8vIGEgc2Vjb25kYXJ5IG5hdmlnYXRpb24gaGFwcGVuZWQgd2hpbGUgd2Ugd2VyZSBsb2FkaW5nXG5cblx0YXdhaXQgcmVuZGVyKHJlZGlyZWN0LCBicmFuY2gsIHByb3BzLCB0YXJnZXQucGFnZSk7XG5cdGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50KSBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcblxuXHRpZiAoIW5vc2Nyb2xsKSB7XG5cdFx0bGV0IHNjcm9sbCA9IHNjcm9sbF9oaXN0b3J5W2lkXTtcblxuXHRcdGlmIChoYXNoKSB7XG5cdFx0XHQvLyBzY3JvbGwgaXMgYW4gZWxlbWVudCBpZCAoZnJvbSBhIGhhc2gpLCB3ZSBuZWVkIHRvIGNvbXB1dGUgeS5cblx0XHRcdGNvbnN0IGRlZXBfbGlua2VkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaGFzaC5zbGljZSgxKSk7XG5cblx0XHRcdGlmIChkZWVwX2xpbmtlZCkge1xuXHRcdFx0XHRzY3JvbGwgPSB7XG5cdFx0XHRcdFx0eDogMCxcblx0XHRcdFx0XHR5OiBkZWVwX2xpbmtlZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBzY3JvbGxZXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c2Nyb2xsX2hpc3RvcnlbY2lkXSA9IHNjcm9sbDtcblx0XHRpZiAoc2Nyb2xsKSBzY3JvbGxUbyhzY3JvbGwueCwgc2Nyb2xsLnkpO1xuXHR9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbmRlcihyZWRpcmVjdCwgYnJhbmNoLCBwcm9wcywgcGFnZSkge1xuXHRpZiAocmVkaXJlY3QpIHJldHVybiBnb3RvKHJlZGlyZWN0LmxvY2F0aW9uLCB7IHJlcGxhY2VTdGF0ZTogdHJ1ZSB9KTtcblxuXHRzdG9yZXMucGFnZS5zZXQocGFnZSk7XG5cdHN0b3Jlcy5wcmVsb2FkaW5nLnNldChmYWxzZSk7XG5cblx0aWYgKHJvb3RfY29tcG9uZW50KSB7XG5cdFx0cm9vdF9jb21wb25lbnQuJHNldChwcm9wcyk7XG5cdH0gZWxzZSB7XG5cdFx0cHJvcHMuc3RvcmVzID0ge1xuXHRcdFx0cGFnZTogeyBzdWJzY3JpYmU6IHN0b3Jlcy5wYWdlLnN1YnNjcmliZSB9LFxuXHRcdFx0cHJlbG9hZGluZzogeyBzdWJzY3JpYmU6IHN0b3Jlcy5wcmVsb2FkaW5nLnN1YnNjcmliZSB9LFxuXHRcdFx0c2Vzc2lvbjogc3RvcmVzLnNlc3Npb25cblx0XHR9O1xuXHRcdHByb3BzLmxldmVsMCA9IHtcblx0XHRcdHByb3BzOiBhd2FpdCByb290X3ByZWxvYWRlZFxuXHRcdH07XG5cdFx0cHJvcHMubm90aWZ5ID0gc3RvcmVzLnBhZ2Uubm90aWZ5O1xuXG5cdFx0Ly8gZmlyc3QgbG9hZCDigJQgcmVtb3ZlIFNTUidkIDxoZWFkPiBjb250ZW50c1xuXHRcdGNvbnN0IHN0YXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NhcHBlci1oZWFkLXN0YXJ0Jyk7XG5cdFx0Y29uc3QgZW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NhcHBlci1oZWFkLWVuZCcpO1xuXG5cdFx0aWYgKHN0YXJ0ICYmIGVuZCkge1xuXHRcdFx0d2hpbGUgKHN0YXJ0Lm5leHRTaWJsaW5nICE9PSBlbmQpIGRldGFjaChzdGFydC5uZXh0U2libGluZyk7XG5cdFx0XHRkZXRhY2goc3RhcnQpO1xuXHRcdFx0ZGV0YWNoKGVuZCk7XG5cdFx0fVxuXG5cdFx0cm9vdF9jb21wb25lbnQgPSBuZXcgQXBwKHtcblx0XHRcdHRhcmdldCxcblx0XHRcdHByb3BzLFxuXHRcdFx0aHlkcmF0ZTogdHJ1ZVxuXHRcdH0pO1xuXHR9XG5cblx0Y3VycmVudF9icmFuY2ggPSBicmFuY2g7XG5cdGN1cnJlbnRfcXVlcnkgPSBKU09OLnN0cmluZ2lmeShwYWdlLnF1ZXJ5KTtcblx0cmVhZHkgPSB0cnVlO1xuXHRzZXNzaW9uX2RpcnR5ID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHBhcnRfY2hhbmdlZChpLCBzZWdtZW50LCBtYXRjaCwgc3RyaW5naWZpZWRfcXVlcnkpIHtcblx0Ly8gVE9ETyBvbmx5IGNoZWNrIHF1ZXJ5IHN0cmluZyBjaGFuZ2VzIGZvciBwcmVsb2FkIGZ1bmN0aW9uc1xuXHQvLyB0aGF0IGRvIGluIGZhY3QgZGVwZW5kIG9uIGl0ICh1c2luZyBzdGF0aWMgYW5hbHlzaXMgb3Jcblx0Ly8gcnVudGltZSBpbnN0cnVtZW50YXRpb24pXG5cdGlmIChzdHJpbmdpZmllZF9xdWVyeSAhPT0gY3VycmVudF9xdWVyeSkgcmV0dXJuIHRydWU7XG5cblx0Y29uc3QgcHJldmlvdXMgPSBjdXJyZW50X2JyYW5jaFtpXTtcblxuXHRpZiAoIXByZXZpb3VzKSByZXR1cm4gZmFsc2U7XG5cdGlmIChzZWdtZW50ICE9PSBwcmV2aW91cy5zZWdtZW50KSByZXR1cm4gdHJ1ZTtcblx0aWYgKHByZXZpb3VzLm1hdGNoKSB7XG5cdFx0aWYgKEpTT04uc3RyaW5naWZ5KHByZXZpb3VzLm1hdGNoLnNsaWNlKDEsIGkgKyAyKSkgIT09IEpTT04uc3RyaW5naWZ5KG1hdGNoLnNsaWNlKDEsIGkgKyAyKSkpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fVxufVxuXG5hc3luYyBmdW5jdGlvbiBoeWRyYXRlX3RhcmdldCh0YXJnZXQpXG5cblxuXG4ge1xuXHRjb25zdCB7IHJvdXRlLCBwYWdlIH0gPSB0YXJnZXQ7XG5cdGNvbnN0IHNlZ21lbnRzID0gcGFnZS5wYXRoLnNwbGl0KCcvJykuZmlsdGVyKEJvb2xlYW4pO1xuXG5cdGxldCByZWRpcmVjdCA9IG51bGw7XG5cblx0Y29uc3QgcHJvcHMgPSB7IGVycm9yOiBudWxsLCBzdGF0dXM6IDIwMCwgc2VnbWVudHM6IFtzZWdtZW50c1swXV0gfTtcblxuXHRjb25zdCBwcmVsb2FkX2NvbnRleHQgPSB7XG5cdFx0ZmV0Y2g6ICh1cmwsIG9wdHMpID0+IGZldGNoKHVybCwgb3B0cyksXG5cdFx0cmVkaXJlY3Q6IChzdGF0dXNDb2RlLCBsb2NhdGlvbikgPT4ge1xuXHRcdFx0aWYgKHJlZGlyZWN0ICYmIChyZWRpcmVjdC5zdGF0dXNDb2RlICE9PSBzdGF0dXNDb2RlIHx8IHJlZGlyZWN0LmxvY2F0aW9uICE9PSBsb2NhdGlvbikpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBDb25mbGljdGluZyByZWRpcmVjdHNgKTtcblx0XHRcdH1cblx0XHRcdHJlZGlyZWN0ID0geyBzdGF0dXNDb2RlLCBsb2NhdGlvbiB9O1xuXHRcdH0sXG5cdFx0ZXJyb3I6IChzdGF0dXMsIGVycm9yKSA9PiB7XG5cdFx0XHRwcm9wcy5lcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBuZXcgRXJyb3IoZXJyb3IpIDogZXJyb3I7XG5cdFx0XHRwcm9wcy5zdGF0dXMgPSBzdGF0dXM7XG5cdFx0fVxuXHR9O1xuXG5cdGlmICghcm9vdF9wcmVsb2FkZWQpIHtcblx0XHRyb290X3ByZWxvYWRlZCA9IGluaXRpYWxfZGF0YS5wcmVsb2FkZWRbMF0gfHwgcm9vdF9wcmVsb2FkLmNhbGwocHJlbG9hZF9jb250ZXh0LCB7XG5cdFx0XHRob3N0OiBwYWdlLmhvc3QsXG5cdFx0XHRwYXRoOiBwYWdlLnBhdGgsXG5cdFx0XHRxdWVyeTogcGFnZS5xdWVyeSxcblx0XHRcdHBhcmFtczoge31cblx0XHR9LCAkc2Vzc2lvbik7XG5cdH1cblxuXHRsZXQgYnJhbmNoO1xuXHRsZXQgbCA9IDE7XG5cblx0dHJ5IHtcblx0XHRjb25zdCBzdHJpbmdpZmllZF9xdWVyeSA9IEpTT04uc3RyaW5naWZ5KHBhZ2UucXVlcnkpO1xuXHRcdGNvbnN0IG1hdGNoID0gcm91dGUucGF0dGVybi5leGVjKHBhZ2UucGF0aCk7XG5cblx0XHRsZXQgc2VnbWVudF9kaXJ0eSA9IGZhbHNlO1xuXG5cdFx0YnJhbmNoID0gYXdhaXQgUHJvbWlzZS5hbGwocm91dGUucGFydHMubWFwKGFzeW5jIChwYXJ0LCBpKSA9PiB7XG5cdFx0XHRjb25zdCBzZWdtZW50ID0gc2VnbWVudHNbaV07XG5cblx0XHRcdGlmIChwYXJ0X2NoYW5nZWQoaSwgc2VnbWVudCwgbWF0Y2gsIHN0cmluZ2lmaWVkX3F1ZXJ5KSkgc2VnbWVudF9kaXJ0eSA9IHRydWU7XG5cblx0XHRcdHByb3BzLnNlZ21lbnRzW2xdID0gc2VnbWVudHNbaSArIDFdOyAvLyBUT0RPIG1ha2UgdGhpcyBsZXNzIGNvbmZ1c2luZ1xuXHRcdFx0aWYgKCFwYXJ0KSByZXR1cm4geyBzZWdtZW50IH07XG5cblx0XHRcdGNvbnN0IGogPSBsKys7XG5cblx0XHRcdGlmICghc2Vzc2lvbl9kaXJ0eSAmJiAhc2VnbWVudF9kaXJ0eSAmJiBjdXJyZW50X2JyYW5jaFtpXSAmJiBjdXJyZW50X2JyYW5jaFtpXS5wYXJ0ID09PSBwYXJ0LmkpIHtcblx0XHRcdFx0cmV0dXJuIGN1cnJlbnRfYnJhbmNoW2ldO1xuXHRcdFx0fVxuXG5cdFx0XHRzZWdtZW50X2RpcnR5ID0gZmFsc2U7XG5cblx0XHRcdGNvbnN0IHsgZGVmYXVsdDogY29tcG9uZW50LCBwcmVsb2FkIH0gPSBhd2FpdCBsb2FkX2NvbXBvbmVudChjb21wb25lbnRzW3BhcnQuaV0pO1xuXG5cdFx0XHRsZXQgcHJlbG9hZGVkO1xuXHRcdFx0aWYgKHJlYWR5IHx8ICFpbml0aWFsX2RhdGEucHJlbG9hZGVkW2kgKyAxXSkge1xuXHRcdFx0XHRwcmVsb2FkZWQgPSBwcmVsb2FkXG5cdFx0XHRcdFx0PyBhd2FpdCBwcmVsb2FkLmNhbGwocHJlbG9hZF9jb250ZXh0LCB7XG5cdFx0XHRcdFx0XHRob3N0OiBwYWdlLmhvc3QsXG5cdFx0XHRcdFx0XHRwYXRoOiBwYWdlLnBhdGgsXG5cdFx0XHRcdFx0XHRxdWVyeTogcGFnZS5xdWVyeSxcblx0XHRcdFx0XHRcdHBhcmFtczogcGFydC5wYXJhbXMgPyBwYXJ0LnBhcmFtcyh0YXJnZXQubWF0Y2gpIDoge31cblx0XHRcdFx0XHR9LCAkc2Vzc2lvbilcblx0XHRcdFx0XHQ6IHt9O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cHJlbG9hZGVkID0gaW5pdGlhbF9kYXRhLnByZWxvYWRlZFtpICsgMV07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAocHJvcHNbYGxldmVsJHtqfWBdID0geyBjb21wb25lbnQsIHByb3BzOiBwcmVsb2FkZWQsIHNlZ21lbnQsIG1hdGNoLCBwYXJ0OiBwYXJ0LmkgfSk7XG5cdFx0fSkpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdHByb3BzLmVycm9yID0gZXJyb3I7XG5cdFx0cHJvcHMuc3RhdHVzID0gNTAwO1xuXHRcdGJyYW5jaCA9IFtdO1xuXHR9XG5cblx0cmV0dXJuIHsgcmVkaXJlY3QsIHByb3BzLCBicmFuY2ggfTtcbn1cblxuZnVuY3Rpb24gbG9hZF9jc3MoY2h1bmspIHtcblx0Y29uc3QgaHJlZiA9IGBjbGllbnQvJHtjaHVua31gO1xuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgbGlua1tocmVmPVwiJHtocmVmfVwiXWApKSByZXR1cm47XG5cblx0cmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWwsIHJlamVjdCkgPT4ge1xuXHRcdGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5cdFx0bGluay5yZWwgPSAnc3R5bGVzaGVldCc7XG5cdFx0bGluay5ocmVmID0gaHJlZjtcblxuXHRcdGxpbmsub25sb2FkID0gKCkgPT4gZnVsZmlsKCk7XG5cdFx0bGluay5vbmVycm9yID0gcmVqZWN0O1xuXG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGxvYWRfY29tcG9uZW50KGNvbXBvbmVudClcblxuXG4ge1xuXHQvLyBUT0RPIHRoaXMgaXMgdGVtcG9yYXJ5IOKAlCBvbmNlIHBsYWNlaG9sZGVycyBhcmVcblx0Ly8gYWx3YXlzIHJld3JpdHRlbiwgc2NyYXRjaCB0aGUgdGVybmFyeVxuXHRjb25zdCBwcm9taXNlcyA9ICh0eXBlb2YgY29tcG9uZW50LmNzcyA9PT0gJ3N0cmluZycgPyBbXSA6IGNvbXBvbmVudC5jc3MubWFwKGxvYWRfY3NzKSk7XG5cdHByb21pc2VzLnVuc2hpZnQoY29tcG9uZW50LmpzKCkpO1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4odmFsdWVzID0+IHZhbHVlc1swXSk7XG59XG5cbmZ1bmN0aW9uIGRldGFjaChub2RlKSB7XG5cdG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbn1cblxuZnVuY3Rpb24gcHJlZmV0Y2goaHJlZikge1xuXHRjb25zdCB0YXJnZXQgPSBzZWxlY3RfdGFyZ2V0KG5ldyBVUkwoaHJlZiwgZG9jdW1lbnQuYmFzZVVSSSkpO1xuXG5cdGlmICh0YXJnZXQpIHtcblx0XHRpZiAoIXByZWZldGNoaW5nIHx8IGhyZWYgIT09IHByZWZldGNoaW5nLmhyZWYpIHtcblx0XHRcdHNldF9wcmVmZXRjaGluZyhocmVmLCBoeWRyYXRlX3RhcmdldCh0YXJnZXQpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcHJlZmV0Y2hpbmcucHJvbWlzZTtcblx0fVxufVxuXG5mdW5jdGlvbiBzdGFydChvcHRzXG5cbikge1xuXHRpZiAoJ3Njcm9sbFJlc3RvcmF0aW9uJyBpbiBfaGlzdG9yeSkge1xuXHRcdF9oaXN0b3J5LnNjcm9sbFJlc3RvcmF0aW9uID0gJ21hbnVhbCc7XG5cdH1cblx0XG5cdC8vIEFkb3B0ZWQgZnJvbSBOdXh0LmpzXG5cdC8vIFJlc2V0IHNjcm9sbFJlc3RvcmF0aW9uIHRvIGF1dG8gd2hlbiBsZWF2aW5nIHBhZ2UsIGFsbG93aW5nIHBhZ2UgcmVsb2FkXG5cdC8vIGFuZCBiYWNrLW5hdmlnYXRpb24gZnJvbSBvdGhlciBwYWdlcyB0byB1c2UgdGhlIGJyb3dzZXIgdG8gcmVzdG9yZSB0aGVcblx0Ly8gc2Nyb2xsaW5nIHBvc2l0aW9uLlxuXHRhZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAoKSA9PiB7XG5cdFx0X2hpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24gPSAnYXV0byc7XG5cdH0pO1xuXG5cdC8vIFNldHRpbmcgc2Nyb2xsUmVzdG9yYXRpb24gdG8gbWFudWFsIGFnYWluIHdoZW4gcmV0dXJuaW5nIHRvIHRoaXMgcGFnZS5cblx0YWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcblx0XHRfaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbiA9ICdtYW51YWwnO1xuXHR9KTtcblxuXHRzZXRfdGFyZ2V0KG9wdHMudGFyZ2V0KTtcblxuXHRhZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZV9jbGljayk7XG5cdGFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgaGFuZGxlX3BvcHN0YXRlKTtcblxuXHQvLyBwcmVmZXRjaFxuXHRhZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdHJpZ2dlcl9wcmVmZXRjaCk7XG5cdGFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZV9tb3VzZW1vdmUpO1xuXG5cdHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcblx0XHRjb25zdCB7IGhhc2gsIGhyZWYgfSA9IGxvY2F0aW9uO1xuXG5cdFx0X2hpc3RvcnkucmVwbGFjZVN0YXRlKHsgaWQ6IHVpZCB9LCAnJywgaHJlZik7XG5cblx0XHRjb25zdCB1cmwgPSBuZXcgVVJMKGxvY2F0aW9uLmhyZWYpO1xuXG5cdFx0aWYgKGluaXRpYWxfZGF0YS5lcnJvcikgcmV0dXJuIGhhbmRsZV9lcnJvcigpO1xuXG5cdFx0Y29uc3QgdGFyZ2V0ID0gc2VsZWN0X3RhcmdldCh1cmwpO1xuXHRcdGlmICh0YXJnZXQpIHJldHVybiBuYXZpZ2F0ZSh0YXJnZXQsIHVpZCwgdHJ1ZSwgaGFzaCk7XG5cdH0pO1xufVxuXG5sZXQgbW91c2Vtb3ZlX3RpbWVvdXQ7XG5cbmZ1bmN0aW9uIGhhbmRsZV9tb3VzZW1vdmUoZXZlbnQpIHtcblx0Y2xlYXJUaW1lb3V0KG1vdXNlbW92ZV90aW1lb3V0KTtcblx0bW91c2Vtb3ZlX3RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcblx0XHR0cmlnZ2VyX3ByZWZldGNoKGV2ZW50KTtcblx0fSwgMjApO1xufVxuXG5mdW5jdGlvbiB0cmlnZ2VyX3ByZWZldGNoKGV2ZW50KSB7XG5cdGNvbnN0IGEgPSBmaW5kX2FuY2hvcihldmVudC50YXJnZXQpO1xuXHRpZiAoIWEgfHwgYS5yZWwgIT09ICdwcmVmZXRjaCcpIHJldHVybjtcblxuXHRwcmVmZXRjaChhLmhyZWYpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfY2xpY2soZXZlbnQpIHtcblx0Ly8gQWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS92aXNpb25tZWRpYS9wYWdlLmpzXG5cdC8vIE1JVCBsaWNlbnNlIGh0dHBzOi8vZ2l0aHViLmNvbS92aXNpb25tZWRpYS9wYWdlLmpzI2xpY2Vuc2Vcblx0aWYgKHdoaWNoKGV2ZW50KSAhPT0gMSkgcmV0dXJuO1xuXHRpZiAoZXZlbnQubWV0YUtleSB8fCBldmVudC5jdHJsS2V5IHx8IGV2ZW50LnNoaWZ0S2V5KSByZXR1cm47XG5cdGlmIChldmVudC5kZWZhdWx0UHJldmVudGVkKSByZXR1cm47XG5cblx0Y29uc3QgYSA9IGZpbmRfYW5jaG9yKGV2ZW50LnRhcmdldCk7XG5cdGlmICghYSkgcmV0dXJuO1xuXG5cdGlmICghYS5ocmVmKSByZXR1cm47XG5cblx0Ly8gY2hlY2sgaWYgbGluayBpcyBpbnNpZGUgYW4gc3ZnXG5cdC8vIGluIHRoaXMgY2FzZSwgYm90aCBocmVmIGFuZCB0YXJnZXQgYXJlIGFsd2F5cyBpbnNpZGUgYW4gb2JqZWN0XG5cdGNvbnN0IHN2ZyA9IHR5cGVvZiBhLmhyZWYgPT09ICdvYmplY3QnICYmIGEuaHJlZi5jb25zdHJ1Y3Rvci5uYW1lID09PSAnU1ZHQW5pbWF0ZWRTdHJpbmcnO1xuXHRjb25zdCBocmVmID0gU3RyaW5nKHN2ZyA/IChhKS5ocmVmLmJhc2VWYWwgOiBhLmhyZWYpO1xuXG5cdGlmIChocmVmID09PSBsb2NhdGlvbi5ocmVmKSB7XG5cdFx0aWYgKCFsb2NhdGlvbi5oYXNoKSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIElnbm9yZSBpZiB0YWcgaGFzXG5cdC8vIDEuICdkb3dubG9hZCcgYXR0cmlidXRlXG5cdC8vIDIuIHJlbD0nZXh0ZXJuYWwnIGF0dHJpYnV0ZVxuXHRpZiAoYS5oYXNBdHRyaWJ1dGUoJ2Rvd25sb2FkJykgfHwgYS5nZXRBdHRyaWJ1dGUoJ3JlbCcpID09PSAnZXh0ZXJuYWwnKSByZXR1cm47XG5cblx0Ly8gSWdub3JlIGlmIDxhPiBoYXMgYSB0YXJnZXRcblx0aWYgKHN2ZyA/IChhKS50YXJnZXQuYmFzZVZhbCA6IGEudGFyZ2V0KSByZXR1cm47XG5cblx0Y29uc3QgdXJsID0gbmV3IFVSTChocmVmKTtcblxuXHQvLyBEb24ndCBoYW5kbGUgaGFzaCBjaGFuZ2VzXG5cdGlmICh1cmwucGF0aG5hbWUgPT09IGxvY2F0aW9uLnBhdGhuYW1lICYmIHVybC5zZWFyY2ggPT09IGxvY2F0aW9uLnNlYXJjaCkgcmV0dXJuO1xuXG5cdGNvbnN0IHRhcmdldCA9IHNlbGVjdF90YXJnZXQodXJsKTtcblx0aWYgKHRhcmdldCkge1xuXHRcdGNvbnN0IG5vc2Nyb2xsID0gYS5oYXNBdHRyaWJ1dGUoJ3NhcHBlci1ub3Njcm9sbCcpO1xuXHRcdG5hdmlnYXRlKHRhcmdldCwgbnVsbCwgbm9zY3JvbGwsIHVybC5oYXNoKTtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdF9oaXN0b3J5LnB1c2hTdGF0ZSh7IGlkOiBjaWQgfSwgJycsIHVybC5ocmVmKTtcblx0fVxufVxuXG5mdW5jdGlvbiB3aGljaChldmVudCkge1xuXHRyZXR1cm4gZXZlbnQud2hpY2ggPT09IG51bGwgPyBldmVudC5idXR0b24gOiBldmVudC53aGljaDtcbn1cblxuZnVuY3Rpb24gZmluZF9hbmNob3Iobm9kZSkge1xuXHR3aGlsZSAobm9kZSAmJiBub2RlLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCkgIT09ICdBJykgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTsgLy8gU1ZHIDxhPiBlbGVtZW50cyBoYXZlIGEgbG93ZXJjYXNlIG5hbWVcblx0cmV0dXJuIG5vZGU7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9wb3BzdGF0ZShldmVudCkge1xuXHRzY3JvbGxfaGlzdG9yeVtjaWRdID0gc2Nyb2xsX3N0YXRlKCk7XG5cblx0aWYgKGV2ZW50LnN0YXRlKSB7XG5cdFx0Y29uc3QgdXJsID0gbmV3IFVSTChsb2NhdGlvbi5ocmVmKTtcblx0XHRjb25zdCB0YXJnZXQgPSBzZWxlY3RfdGFyZ2V0KHVybCk7XG5cdFx0aWYgKHRhcmdldCkge1xuXHRcdFx0bmF2aWdhdGUodGFyZ2V0LCBldmVudC5zdGF0ZS5pZCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxvY2F0aW9uLmhyZWYgPSBsb2NhdGlvbi5ocmVmO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHQvLyBoYXNoY2hhbmdlXG5cdFx0c2V0X3VpZCh1aWQgKyAxKTtcblx0XHRzZXRfY2lkKHVpZCk7XG5cdFx0X2hpc3RvcnkucmVwbGFjZVN0YXRlKHsgaWQ6IGNpZCB9LCAnJywgbG9jYXRpb24uaHJlZik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcHJlZmV0Y2hSb3V0ZXMocGF0aG5hbWVzKSB7XG5cdHJldHVybiByb3V0ZXNcblx0XHQuZmlsdGVyKHBhdGhuYW1lc1xuXHRcdFx0PyByb3V0ZSA9PiBwYXRobmFtZXMuc29tZShwYXRobmFtZSA9PiByb3V0ZS5wYXR0ZXJuLnRlc3QocGF0aG5hbWUpKVxuXHRcdFx0OiAoKSA9PiB0cnVlXG5cdFx0KVxuXHRcdC5yZWR1Y2UoKHByb21pc2UsIHJvdXRlKSA9PiBwcm9taXNlLnRoZW4oKCkgPT4ge1xuXHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKHJvdXRlLnBhcnRzLm1hcChwYXJ0ID0+IHBhcnQgJiYgbG9hZF9jb21wb25lbnQoY29tcG9uZW50c1twYXJ0LmldKSkpO1xuXHRcdH0pLCBQcm9taXNlLnJlc29sdmUoKSk7XG59XG5cbmNvbnN0IHN0b3JlcyQxID0gKCkgPT4gZ2V0Q29udGV4dChDT05URVhUX0tFWSk7XG5cbmV4cG9ydCB7IGdvdG8sIHByZWZldGNoLCBwcmVmZXRjaFJvdXRlcywgc3RhcnQsIHN0b3JlcyQxIGFzIHN0b3JlcyB9O1xuIiwiaW1wb3J0ICogYXMgc2FwcGVyIGZyb20gJ0BzYXBwZXIvYXBwJztcblxuc2FwcGVyLnN0YXJ0KHtcblx0dGFyZ2V0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2FwcGVyJylcbn0pOyJdLCJuYW1lcyI6WyJsaW5lYXIiLCJFcnJvckNvbXBvbmVudCIsImRldGFjaCIsInJvb3RfcHJlbG9hZCIsInNhcHBlci5zdGFydCJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUyxJQUFJLEdBQUcsR0FBRztBQUNuQixNQUFNLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hCLFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDMUI7QUFDQSxJQUFJLEtBQUssTUFBTSxDQUFDLElBQUksR0FBRztBQUN2QixRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFJRCxTQUFTLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0FBQ3pELElBQUksT0FBTyxDQUFDLGFBQWEsR0FBRztBQUM1QixRQUFRLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtBQUN6QyxLQUFLLENBQUM7QUFDTixDQUFDO0FBQ0QsU0FBUyxHQUFHLENBQUMsRUFBRSxFQUFFO0FBQ2pCLElBQUksT0FBTyxFQUFFLEVBQUUsQ0FBQztBQUNoQixDQUFDO0FBQ0QsU0FBUyxZQUFZLEdBQUc7QUFDeEIsSUFBSSxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUNELFNBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUN0QixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckIsQ0FBQztBQUNELFNBQVMsV0FBVyxDQUFDLEtBQUssRUFBRTtBQUM1QixJQUFJLE9BQU8sT0FBTyxLQUFLLEtBQUssVUFBVSxDQUFDO0FBQ3ZDLENBQUM7QUFDRCxTQUFTLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQzlCLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEtBQUssT0FBTyxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUM7QUFDbEcsQ0FBQztBQUlELFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRTtBQUN2QixJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0FBQ3pDLENBQUM7QUFxQkQsU0FBUyxXQUFXLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO0FBQ25ELElBQUksSUFBSSxVQUFVLEVBQUU7QUFDcEIsUUFBUSxNQUFNLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN4RSxRQUFRLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZDLEtBQUs7QUFDTCxDQUFDO0FBQ0QsU0FBUyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7QUFDeEQsSUFBSSxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO0FBQzlCLFVBQVUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzdELFVBQVUsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUN0QixDQUFDO0FBQ0QsU0FBUyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7QUFDMUQsSUFBSSxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7QUFDN0IsUUFBUSxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDOUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO0FBQ3pDLFlBQVksT0FBTyxJQUFJLENBQUM7QUFDeEIsU0FBUztBQUNULFFBQVEsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7QUFDdEMsWUFBWSxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDOUIsWUFBWSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwRSxZQUFZLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM3QyxnQkFBZ0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELGFBQWE7QUFDYixZQUFZLE9BQU8sTUFBTSxDQUFDO0FBQzFCLFNBQVM7QUFDVCxRQUFRLE9BQU8sT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDcEMsS0FBSztBQUNMLElBQUksT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQ3pCLENBQUM7QUFDRCxTQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLG1CQUFtQixFQUFFLG1CQUFtQixFQUFFO0FBQzNHLElBQUksTUFBTSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUNoRyxJQUFJLElBQUksWUFBWSxFQUFFO0FBQ3RCLFFBQVEsTUFBTSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUNsRyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQzNDLEtBQUs7QUFDTCxDQUFDO0FBZ0NELFNBQVMsYUFBYSxDQUFDLEtBQUssRUFBRTtBQUM5QixJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDO0FBQ3RDLENBQUM7QUFTRDtBQUNBLE1BQU0sU0FBUyxHQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQztBQUNoRCxJQUFJLEdBQUcsR0FBRyxTQUFTO0FBQ25CLE1BQU0sTUFBTSxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRTtBQUNwQyxNQUFNLE1BQU0sSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLElBQUksR0FBRyxHQUFHLFNBQVMsR0FBRyxFQUFFLElBQUkscUJBQXFCLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBUTdEO0FBQ0EsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUN4QixTQUFTLFNBQVMsQ0FBQyxHQUFHLEVBQUU7QUFDeEIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSTtBQUMxQixRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQzFCLFlBQVksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQixZQUFZLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNyQixTQUFTO0FBQ1QsS0FBSyxDQUFDLENBQUM7QUFDUCxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDO0FBQ3hCLFFBQVEsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZCLENBQUM7QUFPRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUN4QixJQUFJLElBQUksSUFBSSxDQUFDO0FBQ2IsSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQztBQUN4QixRQUFRLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN2QixJQUFJLE9BQU87QUFDWCxRQUFRLE9BQU8sRUFBRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUk7QUFDeEMsWUFBWSxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFDMUQsU0FBUyxDQUFDO0FBQ1YsUUFBUSxLQUFLLEdBQUc7QUFDaEIsWUFBWSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9CLFNBQVM7QUFDVCxLQUFLLENBQUM7QUFDTixDQUFDO0FBQ0Q7QUFDQSxTQUFTLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFO0FBQzlCLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBQ0QsU0FBUyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDdEMsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLElBQUksSUFBSSxDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUNELFNBQVMsTUFBTSxDQUFDLElBQUksRUFBRTtBQUN0QixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RDLENBQUM7QUFDRCxTQUFTLFlBQVksQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFO0FBQzdDLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNuRCxRQUFRLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQztBQUN6QixZQUFZLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdkMsS0FBSztBQUNMLENBQUM7QUFDRCxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUU7QUFDdkIsSUFBSSxPQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQWdCRCxTQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUU7QUFDM0IsSUFBSSxPQUFPLFFBQVEsQ0FBQyxlQUFlLENBQUMsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDeEUsQ0FBQztBQUNELFNBQVMsSUFBSSxDQUFDLElBQUksRUFBRTtBQUNwQixJQUFJLE9BQU8sUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBQ0QsU0FBUyxLQUFLLEdBQUc7QUFDakIsSUFBSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQixDQUFDO0FBQ0QsU0FBUyxLQUFLLEdBQUc7QUFDakIsSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNwQixDQUFDO0FBQ0QsU0FBUyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQy9DLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDbkQsSUFBSSxPQUFPLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDbkUsQ0FBQztBQUNELFNBQVMsZUFBZSxDQUFDLEVBQUUsRUFBRTtBQUM3QixJQUFJLE9BQU8sVUFBVSxLQUFLLEVBQUU7QUFDNUIsUUFBUSxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDL0I7QUFDQSxRQUFRLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDcEMsS0FBSyxDQUFDO0FBQ04sQ0FBQztBQWVELFNBQVMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFO0FBQ3RDLElBQUksSUFBSSxLQUFLLElBQUksSUFBSTtBQUNyQixRQUFRLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDeEMsU0FBUyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssS0FBSztBQUNuRCxRQUFRLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUEyREQsU0FBUyxRQUFRLENBQUMsT0FBTyxFQUFFO0FBQzNCLElBQUksT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBQ0QsU0FBUyxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFO0FBQ3JELElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM5QyxRQUFRLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5QixRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7QUFDcEMsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEIsWUFBWSxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDOUIsWUFBWSxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtBQUMvQyxnQkFBZ0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZELGdCQUFnQixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNqRCxvQkFBb0IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEQsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixZQUFZLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3BELGdCQUFnQixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hELGFBQWE7QUFDYixZQUFZLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekMsU0FBUztBQUNULEtBQUs7QUFDTCxJQUFJLE9BQU8sR0FBRyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUNELFNBQVMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUU7QUFDakMsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzlDLFFBQVEsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlCLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtBQUNqQyxZQUFZLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztBQUNsQyxZQUFZLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekMsU0FBUztBQUNULEtBQUs7QUFDTCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUFDRCxTQUFTLFdBQVcsQ0FBQyxLQUFLLEVBQUU7QUFDNUIsSUFBSSxPQUFPLFVBQVUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQWlCRCxTQUFTLFNBQVMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7QUFDaEQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLFNBQVMsR0FBRyxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDckUsQ0FBQztBQWdGRCxTQUFTLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQ3BDLElBQUksTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNsRCxJQUFJLENBQUMsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDbEQsSUFBSSxPQUFPLENBQUMsQ0FBQztBQUNiLENBQUM7QUFDRCxTQUFTLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRTtBQUM5RCxJQUFJLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBQ0QsTUFBTSxPQUFPLENBQUM7QUFDZCxJQUFJLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxFQUFFO0FBQy9CLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDeEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQy9CLEtBQUs7QUFDTCxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sR0FBRyxJQUFJLEVBQUU7QUFDbkMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtBQUNyQixZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM5QyxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQzVCLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixTQUFTO0FBQ1QsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZCLEtBQUs7QUFDTCxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUU7QUFDWixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztBQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQy9DLEtBQUs7QUFDTCxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUU7QUFDZCxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ25ELFlBQVksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUM5QyxTQUFTO0FBQ1QsS0FBSztBQUNMLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRTtBQUNaLFFBQVEsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2pCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLEtBQUs7QUFDTCxJQUFJLENBQUMsR0FBRztBQUNSLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0IsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBLE1BQU0sV0FBVyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDOUIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2Y7QUFDQSxTQUFTLElBQUksQ0FBQyxHQUFHLEVBQUU7QUFDbkIsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7QUFDcEIsSUFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0FBQ3ZCLElBQUksT0FBTyxDQUFDLEVBQUU7QUFDZCxRQUFRLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RCxJQUFJLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQztBQUN0QixDQUFDO0FBQ0QsU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUU7QUFDckUsSUFBSSxNQUFNLElBQUksR0FBRyxNQUFNLEdBQUcsUUFBUSxDQUFDO0FBQ25DLElBQUksSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO0FBQzFCLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFO0FBQ3ZDLFFBQVEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEMsUUFBUSxTQUFTLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0RCxLQUFLO0FBQ0wsSUFBSSxNQUFNLElBQUksR0FBRyxTQUFTLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekQsSUFBSSxNQUFNLElBQUksR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDakQsSUFBSSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO0FBQ25DLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6QixJQUFJLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxtQkFBbUIsS0FBSyxHQUFHLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0gsSUFBSSxNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUMsY0FBYyxLQUFLLEdBQUcsQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDMUUsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzlCLFFBQVEsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztBQUNuQyxRQUFRLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEYsS0FBSztBQUNMLElBQUksTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO0FBQ2pELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFLFNBQVMsR0FBRyxDQUFDLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDaEgsSUFBSSxNQUFNLElBQUksQ0FBQyxDQUFDO0FBQ2hCLElBQUksT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUNELFNBQVMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDakMsSUFBSSxNQUFNLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLEVBQUUsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUQsSUFBSSxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUk7QUFDckMsVUFBVSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQ3hDLFVBQVUsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pELEtBQUssQ0FBQztBQUNOLElBQUksTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ2xELElBQUksSUFBSSxPQUFPLEVBQUU7QUFDakIsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9DLFFBQVEsTUFBTSxJQUFJLE9BQU8sQ0FBQztBQUMxQixRQUFRLElBQUksQ0FBQyxNQUFNO0FBQ25CLFlBQVksV0FBVyxFQUFFLENBQUM7QUFDMUIsS0FBSztBQUNMLENBQUM7QUFDRCxTQUFTLFdBQVcsR0FBRztBQUN2QixJQUFJLEdBQUcsQ0FBQyxNQUFNO0FBQ2QsUUFBUSxJQUFJLE1BQU07QUFDbEIsWUFBWSxPQUFPO0FBQ25CLFFBQVEsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUk7QUFDbkMsWUFBWSxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsbUJBQW1CLENBQUM7QUFDdkQsWUFBWSxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUMvQyxZQUFZLE9BQU8sQ0FBQyxFQUFFO0FBQ3RCLGdCQUFnQixVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pDLFlBQVksR0FBRyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDcEMsU0FBUyxDQUFDLENBQUM7QUFDWCxRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUM1QixLQUFLLENBQUMsQ0FBQztBQUNQLENBQUM7QUFzRUQ7QUFDQSxJQUFJLGlCQUFpQixDQUFDO0FBQ3RCLFNBQVMscUJBQXFCLENBQUMsU0FBUyxFQUFFO0FBQzFDLElBQUksaUJBQWlCLEdBQUcsU0FBUyxDQUFDO0FBQ2xDLENBQUM7QUFDRCxTQUFTLHFCQUFxQixHQUFHO0FBQ2pDLElBQUksSUFBSSxDQUFDLGlCQUFpQjtBQUMxQixRQUFRLE1BQU0sSUFBSSxLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQztBQUM1RSxJQUFJLE9BQU8saUJBQWlCLENBQUM7QUFDN0IsQ0FBQztBQUlELFNBQVMsT0FBTyxDQUFDLEVBQUUsRUFBRTtBQUNyQixJQUFJLHFCQUFxQixFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUNELFNBQVMsV0FBVyxDQUFDLEVBQUUsRUFBRTtBQUN6QixJQUFJLHFCQUFxQixFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckQsQ0FBQztBQUlELFNBQVMscUJBQXFCLEdBQUc7QUFDakMsSUFBSSxNQUFNLFNBQVMsR0FBRyxxQkFBcUIsRUFBRSxDQUFDO0FBQzlDLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLEtBQUs7QUFDN0IsUUFBUSxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2RCxRQUFRLElBQUksU0FBUyxFQUFFO0FBQ3ZCO0FBQ0E7QUFDQSxZQUFZLE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDckQsWUFBWSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSTtBQUM1QyxnQkFBZ0IsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDMUMsYUFBYSxDQUFDLENBQUM7QUFDZixTQUFTO0FBQ1QsS0FBSyxDQUFDO0FBQ04sQ0FBQztBQUNELFNBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUU7QUFDbEMsSUFBSSxxQkFBcUIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBQ0QsU0FBUyxVQUFVLENBQUMsR0FBRyxFQUFFO0FBQ3pCLElBQUksT0FBTyxxQkFBcUIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxTQUFTLE1BQU0sQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFO0FBQ2xDLElBQUksTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pELElBQUksSUFBSSxTQUFTLEVBQUU7QUFDbkIsUUFBUSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNuRCxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0EsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7QUFFNUIsTUFBTSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7QUFDN0IsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7QUFDNUIsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBQzNCLE1BQU0sZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzNDLElBQUksZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0FBQzdCLFNBQVMsZUFBZSxHQUFHO0FBQzNCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO0FBQzNCLFFBQVEsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0FBQ2hDLFFBQVEsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3JDLEtBQUs7QUFDTCxDQUFDO0FBQ0QsU0FBUyxJQUFJLEdBQUc7QUFDaEIsSUFBSSxlQUFlLEVBQUUsQ0FBQztBQUN0QixJQUFJLE9BQU8sZ0JBQWdCLENBQUM7QUFDNUIsQ0FBQztBQUNELFNBQVMsbUJBQW1CLENBQUMsRUFBRSxFQUFFO0FBQ2pDLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzlCLENBQUM7QUFJRCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7QUFDckIsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNqQyxTQUFTLEtBQUssR0FBRztBQUNqQixJQUFJLElBQUksUUFBUTtBQUNoQixRQUFRLE9BQU87QUFDZixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDcEIsSUFBSSxHQUFHO0FBQ1A7QUFDQTtBQUNBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzdELFlBQVksTUFBTSxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEQsWUFBWSxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM3QyxZQUFZLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDakMsU0FBUztBQUNULFFBQVEscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEMsUUFBUSxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ3BDLFFBQVEsT0FBTyxpQkFBaUIsQ0FBQyxNQUFNO0FBQ3ZDLFlBQVksaUJBQWlCLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztBQUN0QztBQUNBO0FBQ0E7QUFDQSxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM3RCxZQUFZLE1BQU0sUUFBUSxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pELFlBQVksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDL0M7QUFDQSxnQkFBZ0IsY0FBYyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM3QyxnQkFBZ0IsUUFBUSxFQUFFLENBQUM7QUFDM0IsYUFBYTtBQUNiLFNBQVM7QUFDVCxRQUFRLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDcEMsS0FBSyxRQUFRLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtBQUN0QyxJQUFJLE9BQU8sZUFBZSxDQUFDLE1BQU0sRUFBRTtBQUNuQyxRQUFRLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO0FBQ2hDLEtBQUs7QUFDTCxJQUFJLGdCQUFnQixHQUFHLEtBQUssQ0FBQztBQUM3QixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7QUFDckIsSUFBSSxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDM0IsQ0FBQztBQUNELFNBQVMsTUFBTSxDQUFDLEVBQUUsRUFBRTtBQUNwQixJQUFJLElBQUksRUFBRSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7QUFDOUIsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDcEIsUUFBUSxPQUFPLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2xDLFFBQVEsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztBQUMvQixRQUFRLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLFFBQVEsRUFBRSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3BELFFBQVEsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNyRCxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0EsSUFBSSxPQUFPLENBQUM7QUFDWixTQUFTLElBQUksR0FBRztBQUNoQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDbEIsUUFBUSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3BDLFFBQVEsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNO0FBQzNCLFlBQVksT0FBTyxHQUFHLElBQUksQ0FBQztBQUMzQixTQUFTLENBQUMsQ0FBQztBQUNYLEtBQUs7QUFDTCxJQUFJLE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFDRCxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRTtBQUN6QyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxTQUFTLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hGLENBQUM7QUFDRCxNQUFNLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQzNCLElBQUksTUFBTSxDQUFDO0FBQ1gsU0FBUyxZQUFZLEdBQUc7QUFDeEIsSUFBSSxNQUFNLEdBQUc7QUFDYixRQUFRLENBQUMsRUFBRSxDQUFDO0FBQ1osUUFBUSxDQUFDLEVBQUUsRUFBRTtBQUNiLFFBQVEsQ0FBQyxFQUFFLE1BQU07QUFDakIsS0FBSyxDQUFDO0FBQ04sQ0FBQztBQUNELFNBQVMsWUFBWSxHQUFHO0FBQ3hCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUU7QUFDbkIsUUFBUSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFCLEtBQUs7QUFDTCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUFDRCxTQUFTLGFBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ3JDLElBQUksSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRTtBQUMxQixRQUFRLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0IsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZCLEtBQUs7QUFDTCxDQUFDO0FBQ0QsU0FBUyxjQUFjLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFO0FBQ3hELElBQUksSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRTtBQUMxQixRQUFRLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDL0IsWUFBWSxPQUFPO0FBQ25CLFFBQVEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1QixRQUFRLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU07QUFDNUIsWUFBWSxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ25DLFlBQVksSUFBSSxRQUFRLEVBQUU7QUFDMUIsZ0JBQWdCLElBQUksTUFBTTtBQUMxQixvQkFBb0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQixnQkFBZ0IsUUFBUSxFQUFFLENBQUM7QUFDM0IsYUFBYTtBQUNiLFNBQVMsQ0FBQyxDQUFDO0FBQ1gsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZCLEtBQUs7QUFDTCxDQUFDO0FBQ0QsTUFBTSxlQUFlLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDeEMsU0FBUyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRTtBQUNoRCxJQUFJLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDbEMsSUFBSSxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDeEIsSUFBSSxJQUFJLGNBQWMsQ0FBQztBQUN2QixJQUFJLElBQUksSUFBSSxDQUFDO0FBQ2IsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDaEIsSUFBSSxTQUFTLE9BQU8sR0FBRztBQUN2QixRQUFRLElBQUksY0FBYztBQUMxQixZQUFZLFdBQVcsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDOUMsS0FBSztBQUNMLElBQUksU0FBUyxFQUFFLEdBQUc7QUFDbEIsUUFBUSxNQUFNLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxRQUFRLEdBQUcsR0FBRyxFQUFFLE1BQU0sR0FBRyxRQUFRLEVBQUUsSUFBSSxHQUFHLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxNQUFNLElBQUksZUFBZSxDQUFDO0FBQzdHLFFBQVEsSUFBSSxHQUFHO0FBQ2YsWUFBWSxjQUFjLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQzFGLFFBQVEsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuQixRQUFRLE1BQU0sVUFBVSxHQUFHLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQztBQUN6QyxRQUFRLE1BQU0sUUFBUSxHQUFHLFVBQVUsR0FBRyxRQUFRLENBQUM7QUFDL0MsUUFBUSxJQUFJLElBQUk7QUFDaEIsWUFBWSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDekIsUUFBUSxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLFFBQVEsbUJBQW1CLENBQUMsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ2pFLFFBQVEsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUk7QUFDM0IsWUFBWSxJQUFJLE9BQU8sRUFBRTtBQUN6QixnQkFBZ0IsSUFBSSxHQUFHLElBQUksUUFBUSxFQUFFO0FBQ3JDLG9CQUFvQixJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLG9CQUFvQixRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNoRCxvQkFBb0IsT0FBTyxFQUFFLENBQUM7QUFDOUIsb0JBQW9CLE9BQU8sT0FBTyxHQUFHLEtBQUssQ0FBQztBQUMzQyxpQkFBaUI7QUFDakIsZ0JBQWdCLElBQUksR0FBRyxJQUFJLFVBQVUsRUFBRTtBQUN2QyxvQkFBb0IsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLFVBQVUsSUFBSSxRQUFRLENBQUMsQ0FBQztBQUNwRSxvQkFBb0IsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbkMsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixZQUFZLE9BQU8sT0FBTyxDQUFDO0FBQzNCLFNBQVMsQ0FBQyxDQUFDO0FBQ1gsS0FBSztBQUNMLElBQUksSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQ3hCLElBQUksT0FBTztBQUNYLFFBQVEsS0FBSyxHQUFHO0FBQ2hCLFlBQVksSUFBSSxPQUFPO0FBQ3ZCLGdCQUFnQixPQUFPO0FBQ3ZCLFlBQVksV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlCLFlBQVksSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDckMsZ0JBQWdCLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQztBQUNsQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2hDLGFBQWE7QUFDYixpQkFBaUI7QUFDakIsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDO0FBQ3JCLGFBQWE7QUFDYixTQUFTO0FBQ1QsUUFBUSxVQUFVLEdBQUc7QUFDckIsWUFBWSxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQzVCLFNBQVM7QUFDVCxRQUFRLEdBQUcsR0FBRztBQUNkLFlBQVksSUFBSSxPQUFPLEVBQUU7QUFDekIsZ0JBQWdCLE9BQU8sRUFBRSxDQUFDO0FBQzFCLGdCQUFnQixPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQ2hDLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSyxDQUFDO0FBQ04sQ0FBQztBQUNELFNBQVMscUJBQXFCLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUU7QUFDakQsSUFBSSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2xDLElBQUksSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLElBQUksSUFBSSxjQUFjLENBQUM7QUFDdkIsSUFBSSxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUM7QUFDekIsSUFBSSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixJQUFJLFNBQVMsRUFBRSxHQUFHO0FBQ2xCLFFBQVEsTUFBTSxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsUUFBUSxHQUFHLEdBQUcsRUFBRSxNQUFNLEdBQUcsUUFBUSxFQUFFLElBQUksR0FBRyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsTUFBTSxJQUFJLGVBQWUsQ0FBQztBQUM3RyxRQUFRLElBQUksR0FBRztBQUNmLFlBQVksY0FBYyxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNuRixRQUFRLE1BQU0sVUFBVSxHQUFHLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQztBQUN6QyxRQUFRLE1BQU0sUUFBUSxHQUFHLFVBQVUsR0FBRyxRQUFRLENBQUM7QUFDL0MsUUFBUSxtQkFBbUIsQ0FBQyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDbEUsUUFBUSxJQUFJLENBQUMsR0FBRyxJQUFJO0FBQ3BCLFlBQVksSUFBSSxPQUFPLEVBQUU7QUFDekIsZ0JBQWdCLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRTtBQUNyQyxvQkFBb0IsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMvQixvQkFBb0IsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDakQsb0JBQW9CLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDcEM7QUFDQTtBQUNBLHdCQUF3QixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pDLHFCQUFxQjtBQUNyQixvQkFBb0IsT0FBTyxLQUFLLENBQUM7QUFDakMsaUJBQWlCO0FBQ2pCLGdCQUFnQixJQUFJLEdBQUcsSUFBSSxVQUFVLEVBQUU7QUFDdkMsb0JBQW9CLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxVQUFVLElBQUksUUFBUSxDQUFDLENBQUM7QUFDcEUsb0JBQW9CLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ25DLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2IsWUFBWSxPQUFPLE9BQU8sQ0FBQztBQUMzQixTQUFTLENBQUMsQ0FBQztBQUNYLEtBQUs7QUFDTCxJQUFJLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQzdCLFFBQVEsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU07QUFDMUI7QUFDQSxZQUFZLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQztBQUM5QixZQUFZLEVBQUUsRUFBRSxDQUFDO0FBQ2pCLFNBQVMsQ0FBQyxDQUFDO0FBQ1gsS0FBSztBQUNMLFNBQVM7QUFDVCxRQUFRLEVBQUUsRUFBRSxDQUFDO0FBQ2IsS0FBSztBQUNMLElBQUksT0FBTztBQUNYLFFBQVEsR0FBRyxDQUFDLEtBQUssRUFBRTtBQUNuQixZQUFZLElBQUksS0FBSyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDdEMsZ0JBQWdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLGFBQWE7QUFDYixZQUFZLElBQUksT0FBTyxFQUFFO0FBQ3pCLGdCQUFnQixJQUFJLGNBQWM7QUFDbEMsb0JBQW9CLFdBQVcsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDdEQsZ0JBQWdCLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDaEMsYUFBYTtBQUNiLFNBQVM7QUFDVCxLQUFLLENBQUM7QUFDTixDQUFDO0FBQ0QsU0FBUywrQkFBK0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFDbEUsSUFBSSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2xDLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsSUFBSSxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUM7QUFDL0IsSUFBSSxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUM7QUFDL0IsSUFBSSxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUM7QUFDOUIsSUFBSSxTQUFTLGVBQWUsR0FBRztBQUMvQixRQUFRLElBQUksY0FBYztBQUMxQixZQUFZLFdBQVcsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDOUMsS0FBSztBQUNMLElBQUksU0FBUyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRTtBQUNyQyxRQUFRLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDLFFBQVEsUUFBUSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEMsUUFBUSxPQUFPO0FBQ2YsWUFBWSxDQUFDLEVBQUUsQ0FBQztBQUNoQixZQUFZLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN4QixZQUFZLENBQUM7QUFDYixZQUFZLFFBQVE7QUFDcEIsWUFBWSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7QUFDaEMsWUFBWSxHQUFHLEVBQUUsT0FBTyxDQUFDLEtBQUssR0FBRyxRQUFRO0FBQ3pDLFlBQVksS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO0FBQ2hDLFNBQVMsQ0FBQztBQUNWLEtBQUs7QUFDTCxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNuQixRQUFRLE1BQU0sRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLFFBQVEsR0FBRyxHQUFHLEVBQUUsTUFBTSxHQUFHLFFBQVEsRUFBRSxJQUFJLEdBQUcsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLE1BQU0sSUFBSSxlQUFlLENBQUM7QUFDN0csUUFBUSxNQUFNLE9BQU8sR0FBRztBQUN4QixZQUFZLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxLQUFLO0FBQ2hDLFlBQVksQ0FBQztBQUNiLFNBQVMsQ0FBQztBQUNWLFFBQVEsSUFBSSxDQUFDLENBQUMsRUFBRTtBQUNoQjtBQUNBLFlBQVksT0FBTyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7QUFDbkMsWUFBWSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxQixTQUFTO0FBQ1QsUUFBUSxJQUFJLGVBQWUsSUFBSSxlQUFlLEVBQUU7QUFDaEQsWUFBWSxlQUFlLEdBQUcsT0FBTyxDQUFDO0FBQ3RDLFNBQVM7QUFDVCxhQUFhO0FBQ2I7QUFDQTtBQUNBLFlBQVksSUFBSSxHQUFHLEVBQUU7QUFDckIsZ0JBQWdCLGVBQWUsRUFBRSxDQUFDO0FBQ2xDLGdCQUFnQixjQUFjLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZGLGFBQWE7QUFDYixZQUFZLElBQUksQ0FBQztBQUNqQixnQkFBZ0IsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMzQixZQUFZLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3RELFlBQVksbUJBQW1CLENBQUMsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ2xFLFlBQVksSUFBSSxDQUFDLEdBQUcsSUFBSTtBQUN4QixnQkFBZ0IsSUFBSSxlQUFlLElBQUksR0FBRyxHQUFHLGVBQWUsQ0FBQyxLQUFLLEVBQUU7QUFDcEUsb0JBQW9CLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3RFLG9CQUFvQixlQUFlLEdBQUcsSUFBSSxDQUFDO0FBQzNDLG9CQUFvQixRQUFRLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDL0Qsb0JBQW9CLElBQUksR0FBRyxFQUFFO0FBQzdCLHdCQUF3QixlQUFlLEVBQUUsQ0FBQztBQUMxQyx3QkFBd0IsY0FBYyxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDLEVBQUUsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsSSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCLGdCQUFnQixJQUFJLGVBQWUsRUFBRTtBQUNyQyxvQkFBb0IsSUFBSSxHQUFHLElBQUksZUFBZSxDQUFDLEdBQUcsRUFBRTtBQUNwRCx3QkFBd0IsSUFBSSxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMzRCx3QkFBd0IsUUFBUSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ2pFLHdCQUF3QixJQUFJLENBQUMsZUFBZSxFQUFFO0FBQzlDO0FBQ0EsNEJBQTRCLElBQUksZUFBZSxDQUFDLENBQUMsRUFBRTtBQUNuRDtBQUNBLGdDQUFnQyxlQUFlLEVBQUUsQ0FBQztBQUNsRCw2QkFBNkI7QUFDN0IsaUNBQWlDO0FBQ2pDO0FBQ0EsZ0NBQWdDLElBQUksQ0FBQyxFQUFFLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM5RCxvQ0FBb0MsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckUsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6Qix3QkFBd0IsZUFBZSxHQUFHLElBQUksQ0FBQztBQUMvQyxxQkFBcUI7QUFDckIseUJBQXlCLElBQUksR0FBRyxJQUFJLGVBQWUsQ0FBQyxLQUFLLEVBQUU7QUFDM0Qsd0JBQXdCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDO0FBQzlELHdCQUF3QixDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3pHLHdCQUF3QixJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN2QyxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCLGdCQUFnQixPQUFPLENBQUMsRUFBRSxlQUFlLElBQUksZUFBZSxDQUFDLENBQUM7QUFDOUQsYUFBYSxDQUFDLENBQUM7QUFDZixTQUFTO0FBQ1QsS0FBSztBQUNMLElBQUksT0FBTztBQUNYLFFBQVEsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUNmLFlBQVksSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDckMsZ0JBQWdCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNO0FBQ2xDO0FBQ0Esb0JBQW9CLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQztBQUN0QyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFCLGlCQUFpQixDQUFDLENBQUM7QUFDbkIsYUFBYTtBQUNiLGlCQUFpQjtBQUNqQixnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RCLGFBQWE7QUFDYixTQUFTO0FBQ1QsUUFBUSxHQUFHLEdBQUc7QUFDZCxZQUFZLGVBQWUsRUFBRSxDQUFDO0FBQzlCLFlBQVksZUFBZSxHQUFHLGVBQWUsR0FBRyxJQUFJLENBQUM7QUFDckQsU0FBUztBQUNULEtBQUssQ0FBQztBQUNOLENBQUM7QUFzRUQ7QUFDQSxNQUFNLE9BQU8sSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXO0FBQzlDLE1BQU0sTUFBTTtBQUNaLE1BQU0sT0FBTyxVQUFVLEtBQUssV0FBVztBQUN2QyxVQUFVLFVBQVU7QUFDcEIsVUFBVSxNQUFNLENBQUMsQ0FBQztBQXdHbEI7QUFDQSxTQUFTLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUU7QUFDNUMsSUFBSSxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDdEIsSUFBSSxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDM0IsSUFBSSxNQUFNLGFBQWEsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUN6QyxJQUFJLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDMUIsSUFBSSxPQUFPLENBQUMsRUFBRSxFQUFFO0FBQ2hCLFFBQVEsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVCLFFBQVEsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdCLFFBQVEsSUFBSSxDQUFDLEVBQUU7QUFDZixZQUFZLEtBQUssTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFO0FBQ2pDLGdCQUFnQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUMvQixvQkFBb0IsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6QyxhQUFhO0FBQ2IsWUFBWSxLQUFLLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRTtBQUNqQyxnQkFBZ0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN6QyxvQkFBb0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6QyxvQkFBb0IsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzQyxpQkFBaUI7QUFDakIsYUFBYTtBQUNiLFlBQVksTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixTQUFTO0FBQ1QsYUFBYTtBQUNiLFlBQVksS0FBSyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUU7QUFDakMsZ0JBQWdCLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkMsYUFBYTtBQUNiLFNBQVM7QUFDVCxLQUFLO0FBQ0wsSUFBSSxLQUFLLE1BQU0sR0FBRyxJQUFJLFdBQVcsRUFBRTtBQUNuQyxRQUFRLElBQUksRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDO0FBQzVCLFlBQVksTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQztBQUNwQyxLQUFLO0FBQ0wsSUFBSSxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBQ0QsU0FBUyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUU7QUFDekMsSUFBSSxPQUFPLE9BQU8sWUFBWSxLQUFLLFFBQVEsSUFBSSxZQUFZLEtBQUssSUFBSSxHQUFHLFlBQVksR0FBRyxFQUFFLENBQUM7QUFDekYsQ0FBQztBQWlKRCxTQUFTLGdCQUFnQixDQUFDLEtBQUssRUFBRTtBQUNqQyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDdkIsQ0FBQztBQUNELFNBQVMsZUFBZSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUU7QUFDOUMsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBQ0QsU0FBUyxlQUFlLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDcEQsSUFBSSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQztBQUMxRSxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUMzQztBQUNBLElBQUksbUJBQW1CLENBQUMsTUFBTTtBQUM5QixRQUFRLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3JFLFFBQVEsSUFBSSxVQUFVLEVBQUU7QUFDeEIsWUFBWSxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUM7QUFDL0MsU0FBUztBQUNULGFBQWE7QUFDYjtBQUNBO0FBQ0EsWUFBWSxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDcEMsU0FBUztBQUNULFFBQVEsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ25DLEtBQUssQ0FBQyxDQUFDO0FBQ1AsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUNELFNBQVMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRTtBQUNqRCxJQUFJLE1BQU0sRUFBRSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUM7QUFDNUIsSUFBSSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFO0FBQzlCLFFBQVEsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMvQixRQUFRLEVBQUUsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDaEQ7QUFDQTtBQUNBLFFBQVEsRUFBRSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztBQUMzQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLEtBQUs7QUFDTCxDQUFDO0FBQ0QsU0FBUyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRTtBQUNsQyxJQUFJLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDdEMsUUFBUSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDekMsUUFBUSxlQUFlLEVBQUUsQ0FBQztBQUMxQixRQUFRLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuQyxLQUFLO0FBQ0wsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hELENBQUM7QUFDRCxTQUFTLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQzdGLElBQUksTUFBTSxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQztBQUMvQyxJQUFJLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3JDLElBQUksTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7QUFDNUMsSUFBSSxNQUFNLEVBQUUsR0FBRyxTQUFTLENBQUMsRUFBRSxHQUFHO0FBQzlCLFFBQVEsUUFBUSxFQUFFLElBQUk7QUFDdEIsUUFBUSxHQUFHLEVBQUUsSUFBSTtBQUNqQjtBQUNBLFFBQVEsS0FBSztBQUNiLFFBQVEsTUFBTSxFQUFFLElBQUk7QUFDcEIsUUFBUSxTQUFTO0FBQ2pCLFFBQVEsS0FBSyxFQUFFLFlBQVksRUFBRTtBQUM3QjtBQUNBLFFBQVEsUUFBUSxFQUFFLEVBQUU7QUFDcEIsUUFBUSxVQUFVLEVBQUUsRUFBRTtBQUN0QixRQUFRLGFBQWEsRUFBRSxFQUFFO0FBQ3pCLFFBQVEsWUFBWSxFQUFFLEVBQUU7QUFDeEIsUUFBUSxPQUFPLEVBQUUsSUFBSSxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDN0U7QUFDQSxRQUFRLFNBQVMsRUFBRSxZQUFZLEVBQUU7QUFDakMsUUFBUSxLQUFLO0FBQ2IsUUFBUSxVQUFVLEVBQUUsS0FBSztBQUN6QixLQUFLLENBQUM7QUFDTixJQUFJLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztBQUN0QixJQUFJLEVBQUUsQ0FBQyxHQUFHLEdBQUcsUUFBUTtBQUNyQixVQUFVLFFBQVEsQ0FBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksS0FBSztBQUNoRSxZQUFZLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUN0RCxZQUFZLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxFQUFFO0FBQ25FLGdCQUFnQixJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNqRCxvQkFBb0IsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2QyxnQkFBZ0IsSUFBSSxLQUFLO0FBQ3pCLG9CQUFvQixVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzdDLGFBQWE7QUFDYixZQUFZLE9BQU8sR0FBRyxDQUFDO0FBQ3ZCLFNBQVMsQ0FBQztBQUNWLFVBQVUsRUFBRSxDQUFDO0FBQ2IsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDaEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUM5QjtBQUNBLElBQUksRUFBRSxDQUFDLFFBQVEsR0FBRyxlQUFlLEdBQUcsZUFBZSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDcEUsSUFBSSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7QUFDeEIsUUFBUSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7QUFDN0IsWUFBWSxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25EO0FBQ0EsWUFBWSxFQUFFLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hELFlBQVksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNsQyxTQUFTO0FBQ1QsYUFBYTtBQUNiO0FBQ0EsWUFBWSxFQUFFLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDM0MsU0FBUztBQUNULFFBQVEsSUFBSSxPQUFPLENBQUMsS0FBSztBQUN6QixZQUFZLGFBQWEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pELFFBQVEsZUFBZSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuRSxRQUFRLEtBQUssRUFBRSxDQUFDO0FBQ2hCLEtBQUs7QUFDTCxJQUFJLHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDNUMsQ0FBQztBQXlDRCxNQUFNLGVBQWUsQ0FBQztBQUN0QixJQUFJLFFBQVEsR0FBRztBQUNmLFFBQVEsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ25DLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDN0IsS0FBSztBQUNMLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDeEIsUUFBUSxNQUFNLFNBQVMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3RGLFFBQVEsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxRQUFRLE9BQU8sTUFBTTtBQUNyQixZQUFZLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEQsWUFBWSxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUM7QUFDNUIsZ0JBQWdCLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzNDLFNBQVMsQ0FBQztBQUNWLEtBQUs7QUFDTCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDbEIsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDOUMsWUFBWSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDdEMsWUFBWSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2hDLFlBQVksSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ3ZDLFNBQVM7QUFDVCxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0EsU0FBUyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRTtBQUNwQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3RixDQUFDO0FBQ0QsU0FBUyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRTtBQUNsQyxJQUFJLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3RELElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBQ0QsU0FBUyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDMUMsSUFBSSxZQUFZLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDOUQsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBQ0QsU0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFO0FBQzFCLElBQUksWUFBWSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM5QyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixDQUFDO0FBZ0JELFNBQVMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRTtBQUM5RixJQUFJLE1BQU0sU0FBUyxHQUFHLE9BQU8sS0FBSyxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3ZHLElBQUksSUFBSSxtQkFBbUI7QUFDM0IsUUFBUSxTQUFTLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDekMsSUFBSSxJQUFJLG9CQUFvQjtBQUM1QixRQUFRLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUMxQyxJQUFJLFlBQVksQ0FBQywyQkFBMkIsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7QUFDbkYsSUFBSSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDMUQsSUFBSSxPQUFPLE1BQU07QUFDakIsUUFBUSxZQUFZLENBQUMsOEJBQThCLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0FBQzFGLFFBQVEsT0FBTyxFQUFFLENBQUM7QUFDbEIsS0FBSyxDQUFDO0FBQ04sQ0FBQztBQUNELFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFO0FBQzFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDakMsSUFBSSxJQUFJLEtBQUssSUFBSSxJQUFJO0FBQ3JCLFFBQVEsWUFBWSxDQUFDLDBCQUEwQixFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7QUFDdEU7QUFDQSxRQUFRLFlBQVksQ0FBQyx1QkFBdUIsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUMxRSxDQUFDO0FBU0QsU0FBUyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtBQUNsQyxJQUFJLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUk7QUFDL0IsUUFBUSxPQUFPO0FBQ2YsSUFBSSxZQUFZLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDM0QsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNyQixDQUFDO0FBQ0QsU0FBUyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUU7QUFDckMsSUFBSSxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxFQUFFLEdBQUcsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksUUFBUSxJQUFJLEdBQUcsQ0FBQyxFQUFFO0FBQ3pGLFFBQVEsSUFBSSxHQUFHLEdBQUcsZ0RBQWdELENBQUM7QUFDbkUsUUFBUSxJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFDM0UsWUFBWSxHQUFHLElBQUksK0RBQStELENBQUM7QUFDbkYsU0FBUztBQUNULFFBQVEsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM3QixLQUFLO0FBQ0wsQ0FBQztBQUNELFNBQVMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQzFDLElBQUksS0FBSyxNQUFNLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzlDLFFBQVEsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUN0QyxZQUFZLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLCtCQUErQixFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2pGLFNBQVM7QUFDVCxLQUFLO0FBQ0wsQ0FBQztBQUNELE1BQU0sa0JBQWtCLFNBQVMsZUFBZSxDQUFDO0FBQ2pELElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtBQUN6QixRQUFRLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQ2hFLFlBQVksTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBQzdELFNBQVM7QUFDVCxRQUFRLEtBQUssRUFBRSxDQUFDO0FBQ2hCLEtBQUs7QUFDTCxJQUFJLFFBQVEsR0FBRztBQUNmLFFBQVEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ3pCLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNO0FBQzlCLFlBQVksT0FBTyxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQzVELFNBQVMsQ0FBQztBQUNWLEtBQUs7QUFDTCxJQUFJLGNBQWMsR0FBRyxHQUFHO0FBQ3hCLElBQUksYUFBYSxHQUFHLEdBQUc7QUFDdkI7O0FDcG1EQSxNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztBQUM1QixBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxHQUFHLElBQUksRUFBRTtBQUN2QyxJQUFJLElBQUksSUFBSSxDQUFDO0FBQ2IsSUFBSSxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDM0IsSUFBSSxTQUFTLEdBQUcsQ0FBQyxTQUFTLEVBQUU7QUFDNUIsUUFBUSxJQUFJLGNBQWMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLEVBQUU7QUFDOUMsWUFBWSxLQUFLLEdBQUcsU0FBUyxDQUFDO0FBQzlCLFlBQVksSUFBSSxJQUFJLEVBQUU7QUFDdEIsZ0JBQWdCLE1BQU0sU0FBUyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO0FBQzNELGdCQUFnQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ2hFLG9CQUFvQixNQUFNLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0Msb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzNCLG9CQUFvQixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3BELGlCQUFpQjtBQUNqQixnQkFBZ0IsSUFBSSxTQUFTLEVBQUU7QUFDL0Isb0JBQW9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUN6RSx3QkFBd0IsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEUscUJBQXFCO0FBQ3JCLG9CQUFvQixnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2hELGlCQUFpQjtBQUNqQixhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUs7QUFDTCxJQUFJLFNBQVMsTUFBTSxDQUFDLEVBQUUsRUFBRTtBQUN4QixRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUN2QixLQUFLO0FBQ0wsSUFBSSxTQUFTLFNBQVMsQ0FBQyxHQUFHLEVBQUUsVUFBVSxHQUFHLElBQUksRUFBRTtBQUMvQyxRQUFRLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzdDLFFBQVEsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNyQyxRQUFRLElBQUksV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDdEMsWUFBWSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQztBQUN0QyxTQUFTO0FBQ1QsUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbkIsUUFBUSxPQUFPLE1BQU07QUFDckIsWUFBWSxNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzFELFlBQVksSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDOUIsZ0JBQWdCLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzdDLGFBQWE7QUFDYixZQUFZLElBQUksV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDMUMsZ0JBQWdCLElBQUksRUFBRSxDQUFDO0FBQ3ZCLGdCQUFnQixJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQzVCLGFBQWE7QUFDYixTQUFTLENBQUM7QUFDVixLQUFLO0FBQ0wsSUFBSSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsQ0FBQztBQUN0QyxDQUFDOztBQzdETSxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDOUI7QUFDQSxBQUFPLE1BQU0sT0FBTyxHQUFHLE9BQU8sRUFBRSxDQUFDOzsyQkFBQywzQkNtRGxDLFNBQVMsVUFBVSxDQUFDLENBQUMsRUFBRTtBQUN2QixJQUFJLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2hGLENBQUM7QUFDRCxBQUdBLFNBQVMsUUFBUSxDQUFDLENBQUMsRUFBRTtBQUNyQixJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDdEIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUMzQixDQUFDO0FBQ0QsQUEwQ0EsU0FBUyxVQUFVLENBQUMsQ0FBQyxFQUFFO0FBQ3ZCLElBQUksT0FBTyxDQUFDLEdBQUcsR0FBRztBQUNsQixVQUFVLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztBQUNqQyxVQUFVLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDOUMsQ0FBQztBQUNELEFBY0EsU0FBUyxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3JCLElBQUksT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ25DLENBQUM7O0FDbEdELFNBQVMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsUUFBUSxHQUFHLEdBQUcsRUFBRSxNQUFNLEdBQUcsVUFBVSxFQUFFLE1BQU0sR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFHLENBQUMsRUFBRSxFQUFFO0FBQ2pHLElBQUksTUFBTSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekMsSUFBSSxNQUFNLGNBQWMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7QUFDMUMsSUFBSSxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxLQUFLLE1BQU0sR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUMxRCxJQUFJLE1BQU0sRUFBRSxHQUFHLGNBQWMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7QUFDOUMsSUFBSSxPQUFPO0FBQ1gsUUFBUSxLQUFLO0FBQ2IsUUFBUSxRQUFRO0FBQ2hCLFFBQVEsTUFBTTtBQUNkLFFBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxjQUFjLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ3BHLEtBQUssQ0FBQztBQUNOLENBQUM7QUFDRCxTQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLFFBQVEsR0FBRyxHQUFHLEVBQUUsTUFBTSxHQUFHQSxRQUFNLEVBQUUsRUFBRTtBQUNwRSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDO0FBQzlDLElBQUksT0FBTztBQUNYLFFBQVEsS0FBSztBQUNiLFFBQVEsUUFBUTtBQUNoQixRQUFRLE1BQU07QUFDZCxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLEtBQUssQ0FBQztBQUNOLENBQUM7QUFDRCxTQUFTLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLFFBQVEsR0FBRyxHQUFHLEVBQUUsTUFBTSxHQUFHLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFHLENBQUMsRUFBRSxFQUFFO0FBQ2hHLElBQUksTUFBTSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekMsSUFBSSxNQUFNLGNBQWMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7QUFDMUMsSUFBSSxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxLQUFLLE1BQU0sR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztBQUN4RSxJQUFJLE1BQU0sRUFBRSxHQUFHLGNBQWMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7QUFDOUMsSUFBSSxPQUFPO0FBQ1gsUUFBUSxLQUFLO0FBQ2IsUUFBUSxRQUFRO0FBQ2hCLFFBQVEsTUFBTTtBQUNkLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO0FBQ3hCLGNBQWMsRUFBRSxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckUsWUFBWSxFQUFFLGNBQWMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6QyxLQUFLLENBQUM7QUFDTixDQUFDO0FBQ0QsU0FBUyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxRQUFRLEdBQUcsR0FBRyxFQUFFLE1BQU0sR0FBRyxRQUFRLEVBQUUsRUFBRTtBQUN2RSxJQUFJLE1BQU0sS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pDLElBQUksTUFBTSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0FBQ25DLElBQUksTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM1QyxJQUFJLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDckQsSUFBSSxNQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzNELElBQUksTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuRCxJQUFJLE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDekQsSUFBSSxNQUFNLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDOUQsSUFBSSxNQUFNLG1CQUFtQixHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNwRSxJQUFJLE9BQU87QUFDWCxRQUFRLEtBQUs7QUFDYixRQUFRLFFBQVE7QUFDaEIsUUFBUSxNQUFNO0FBQ2QsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLG1CQUFtQjtBQUNyQyxZQUFZLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ3hELFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDdEMsWUFBWSxDQUFDLGFBQWEsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQztBQUNoRCxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUM7QUFDdEQsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQztBQUM5QyxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDO0FBQ3BELFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxDQUFDO0FBQzFELFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsbUJBQW1CLENBQUMsR0FBRyxDQUFDO0FBQ2hFLEtBQUssQ0FBQztBQUNOLENBQUM7QUFDRCxTQUFTLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLFFBQVEsR0FBRyxHQUFHLEVBQUUsTUFBTSxHQUFHLFFBQVEsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxDQUFDLEVBQUUsRUFBRTtBQUMvRixJQUFJLE1BQU0sS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pDLElBQUksTUFBTSxjQUFjLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0FBQzFDLElBQUksTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsS0FBSyxNQUFNLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7QUFDeEUsSUFBSSxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQ3pCLElBQUksTUFBTSxFQUFFLEdBQUcsY0FBYyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztBQUM5QyxJQUFJLE9BQU87QUFDWCxRQUFRLEtBQUs7QUFDYixRQUFRLFFBQVE7QUFDaEIsUUFBUSxNQUFNO0FBQ2QsUUFBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUM7QUFDekIsY0FBYyxFQUFFLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNoRCxZQUFZLEVBQUUsY0FBYyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN4QyxFQUFFLENBQUM7QUFDSCxLQUFLLENBQUM7QUFDTixDQUFDO0FBQ0QsU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sR0FBRyxVQUFVLEVBQUUsRUFBRTtBQUN6RSxJQUFJLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN0QyxJQUFJLElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtBQUNoQyxRQUFRLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtBQUNqQyxZQUFZLFFBQVEsR0FBRyxHQUFHLENBQUM7QUFDM0IsU0FBUztBQUNULGFBQWE7QUFDYixZQUFZLFFBQVEsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO0FBQ25DLFNBQVM7QUFDVCxLQUFLO0FBQ0wsU0FBUyxJQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVUsRUFBRTtBQUM3QyxRQUFRLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakMsS0FBSztBQUNMLElBQUksT0FBTztBQUNYLFFBQVEsS0FBSztBQUNiLFFBQVEsUUFBUTtBQUNoQixRQUFRLE1BQU07QUFDZCxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDaEUsS0FBSyxDQUFDO0FBQ04sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0MxSFUsU0FBUzs7Ozs7Ozs7O0dBcUltQixTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZGQ3RDUixHQUFTLE1BQUcsWUFBWSxHQUFHLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzSUFBN0IsR0FBUyxNQUFHLFlBQVksR0FBRyxFQUFFOzs7Ozs7Ozs7OztvRUFFdEMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7O21EQUFrQixDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FoR3hGLFNBQVM7T0FFZCxRQUFRLEdBQUcscUJBQXFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJDOFBmLEdBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0ZBQVQsR0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OERBaUNELENBQUMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRzs7Ozs7Ozs7K0NBQy9CLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4REFPaEMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHOzs7Ozs7OzsrQ0FDL0IsQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQkFkOUMsR0FBUyxJQUFDLGNBQWM7K0JBR3hCLEdBQVMsSUFBQyxXQUFXOytCQVFyQixHQUFTLElBQUMsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lGQXBDUSxHQUFTLElBQUMsVUFBVSxHQUFHLGNBQWMsR0FBRyxFQUFFLHlCQUFHLEdBQVMsSUFBQyxVQUFVLEdBQUcsY0FBYyxHQUFHLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dFQVNqRyxHQUFTLElBQUMsVUFBVSxHQUFHLGNBQWMsR0FBRyxFQUFFLGtEQUN2RCxHQUFTLElBQUMsV0FBVyxHQUFHLGNBQWMsR0FBRyxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBFQUNsQixHQUFZOzs7OzswSEFYZCxHQUFTLElBQUMsVUFBVSxHQUFHLGNBQWMsR0FBRyxFQUFFLHlCQUFHLEdBQVMsSUFBQyxVQUFVLEdBQUcsY0FBYyxHQUFHLEVBQUU7Ozs7aUhBU2pHLEdBQVMsSUFBQyxVQUFVLEdBQUcsY0FBYyxHQUFHLEVBQUUsa0RBQ3ZELEdBQVMsSUFBQyxXQUFXLEdBQUcsY0FBYyxHQUFHLEVBQUU7Ozs7cUJBZS9DLEdBQVMsSUFBQyxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBR3hCLEdBQVMsSUFBQyxXQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBUXJCLEdBQVMsSUFBQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQXhDbkMsR0FBUyxxQkFBSSxHQUFTLFFBQUssS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBQWhDLEdBQVMscUJBQUksR0FBUyxRQUFLLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0F0TXhCLDBCQUEwQixDQUFDLGVBQWUsRUFBRSxjQUFjO0tBQzVELFFBQVEsT0FBTyxRQUFROztDQUUxQixjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVM7RUFDN0IsUUFBUSxDQUFDLE1BQU0sSUFBSSxTQUFTLE9BQU8sZUFBZSxDQUFDLFNBQVMsRUFBRSxLQUFLOzs7UUFHL0QsUUFBUTs7Ozs7O09BOURSLFNBQVM7S0FFaEIsU0FBUyxHQUFHLEtBQUs7S0FDakIsV0FBVzs7S0FFWCxTQUFTO0VBQ1QsY0FBYyxFQUFFLEtBQUs7RUFDckIsV0FBVyxFQUFFLEtBQUs7RUFDbEIsU0FBUyxFQUFFLEtBQUs7RUFDaEIsVUFBVSxFQUFFLEtBQUs7OztLQUdqQixnQkFBZ0IsR0FBRyxTQUFTOztVQUV2QixTQUFTLENBQUMsSUFBSTtFQUNuQixVQUFVOztVQUNBLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVM7O2dCQUU5QixRQUFRLEVBQUUsVUFBVSxLQUFLLFFBQVE7cUJBQ3hDLFNBQVMsQ0FBQyxRQUFRLElBQUksS0FBSzs7O0lBRy9CLFdBQVcsQ0FBQyxPQUFPLENBQUUsS0FBSztLQUN0QixLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUU7OztHQUVyQixJQUFJOzs7O2dCQUdJLFlBQVksQ0FBQyxDQUFDO2tCQUN6QixTQUFTLENBQUMsY0FBYyxHQUFHLElBQUk7a0JBQy9CLFNBQVMsQ0FBQyxVQUFVLEdBQUcsSUFBSTtrQkFDM0IsU0FBUyxDQUFDLFdBQVcsR0FBRyxLQUFLO1FBQ3ZCLGNBQWMsSUFBSSxNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVM7UUFDNUMsV0FBVyxHQUFHLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsY0FBYztRQUNqRSxPQUFPO1FBQ1AsUUFBUSxLQUNWLE1BQU0sRUFBRSxNQUFNLEVBQ2QsSUFBSSxFQUFFLFdBQVc7OztTQUlYLFFBQVEsU0FBUyxLQUFLLENBQUMsT0FBTyxFQUFFLFFBQVE7U0FDeEMsSUFBSSxTQUFTLFFBQVEsQ0FBQyxJQUFJO21CQUNoQyxTQUFTLENBQUMsY0FBYyxHQUFHLEtBQUs7bUJBQ2hDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSTtHQUU1QixTQUFTLENBQUMsSUFBSTtVQUNULENBQUM7bUJBQ04sU0FBUyxDQUFDLGNBQWMsR0FBRyxLQUFLO21CQUNoQyxTQUFTLENBQUMsU0FBUyxHQUFHLElBQUk7R0FDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0dBQ3RDLFNBQVMsQ0FBQyxJQUFJOzs7Ozs7Ozs7Ozs7R0E0Tm9CLFdBQVcsQ0FBQyxDQUFDOzs7Ozs7O0dBR2IsV0FBVyxDQUFDLENBQUM7Ozs7Ozs7R0FHVixXQUFXLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dDQ3JLckQsR0FBbUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7K0JBQW5CLEdBQW1COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFaWCxRQUFRLEVBQUUsR0FBRztJQUFFLEtBQUssRUFBRSxDQUFDO0lBQUUsTUFBTSxFQUFFLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFlckMsUUFBUSxFQUFFLElBQUk7TUFBRSxLQUFLLEVBQUUsSUFBSTtNQUFFLE1BQU0sRUFBRSxVQUFVOzs7Ozs7Ozs7O01BTy9DLFFBQVEsZUFBRSxHQUFRO01BQUUsS0FBSyxFQUFFLENBQUM7TUFBRSxNQUFNLEVBQUUsVUFBVTs7Ozs7Ozs7OztNQU9oRCxRQUFRLEVBQUUsSUFBSTtNQUFFLEtBQUssRUFBRSxJQUFJO01BQUUsTUFBTSxFQUFFLFVBQVU7Ozs7Ozs7Ozs7TUFPL0MsUUFBUSxlQUFFLEdBQVE7TUFBRSxLQUFLLEVBQUUsR0FBRztNQUFFLE1BQU0sRUFBRSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21DQThCN0QsR0FBWTttQ0FjWixHQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lCQWRaLEdBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5QkFjWixHQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhFQVpELFFBQVEsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUM7Ozs7Ozs7OzBEQUN0QixRQUFRLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhFQWF4QixRQUFRLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDOzs7Ozs7OzswREFDdEIsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lDQXJGMUMsR0FBbUIsbUJBQUksR0FBTzswQ0FpRDdCLEdBQW1CLG1CQUFJLEdBQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OytCQWpEL0IsR0FBbUIsbUJBQUksR0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBaUQ3QixHQUFtQixtQkFBSSxHQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FwSnJCLG1CQUFtQjtJQUFFLFlBQVk7SUFBRSxPQUFPLEdBQUcsSUFBSTs7S0FFeEQsUUFBUSxHQUFHLElBQUk7S0FFZixtQkFBbUIsR0FBRyxLQUFLOztDQUUvQixPQUFPO2tCQUNILG1CQUFtQixHQUFHLG1CQUFtQixHQUFHLElBQUksR0FBRyxLQUFLOztNQUNyRCxtQkFBbUI7R0FDcEIsVUFBVTs7S0FDTixRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxPQUFPO01BQ2hELE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFNBQVM7TUFDOUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsT0FBTzs7O0tBR2xDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUk7TUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsU0FBUztNQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxPQUFPOzs7SUFFaEMsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkN5RGlCLEdBQUk7Ozs7Ozs7O3dDQUFKLEdBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7O29EQUFKLEdBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaEYzQixJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OENDMllvQixHQUFNOzs7OzswQkFLQyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRFQVVWLEdBQU8sUUFBSyxTQUFTLEdBQUcsVUFBVSxHQUFHLEVBQUU7Ozs7Ozs0RUFNdkMsR0FBTyxRQUFLLE9BQU8sR0FBRyxVQUFVLEdBQUcsRUFBRTs7Ozs7OzRFQU1yQyxHQUFPLFFBQUssVUFBVSxHQUFHLFVBQVUsR0FBRyxFQUFFOzs7Ozs7NEVBTXhDLEdBQU8sUUFBSyxZQUFZLEdBQUcsVUFBVSxHQUFHLEVBQUU7Ozs7O2lFQU0xQyxHQUFTLE1BQUcsVUFBVSxHQUFHLEVBQUU7OzhFQTNCZixHQUFTLE1BQUcsY0FBYyxHQUFHLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0ZBekIzRCxHQUFhO0tBQUcsb0JBQW9CO0tBQUcsV0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQkFjcEIsVUFBVTsrQkFNckIsVUFBVTtxREFVUyxHQUFtQjtxREFNbkIsR0FBbUI7cURBTW5CLEdBQW1CO3FEQU1uQixHQUFtQjsyQ0FNbkIsR0FBUzs7Ozs7Ozs7OzttSEExQi9CLEdBQU8sUUFBSyxTQUFTLEdBQUcsVUFBVSxHQUFHLEVBQUU7Ozs7bUhBTXZDLEdBQU8sUUFBSyxPQUFPLEdBQUcsVUFBVSxHQUFHLEVBQUU7Ozs7bUhBTXJDLEdBQU8sUUFBSyxVQUFVLEdBQUcsVUFBVSxHQUFHLEVBQUU7Ozs7bUhBTXhDLEdBQU8sUUFBSyxZQUFZLEdBQUcsVUFBVSxHQUFHLEVBQUU7Ozs7MEdBTTFDLEdBQVMsTUFBRyxVQUFVLEdBQUcsRUFBRTs7Ozt1SEEzQmYsR0FBUyxNQUFHLGNBQWMsR0FBRyxFQUFFOzs7O2dJQXpCM0QsR0FBYTtLQUFHLG9CQUFvQjtLQUFHLFdBQVc7Ozs7Ozs7Ozs7OztrREEyQi9CLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRzs7Ozs7OztrREFNakMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHOzs7Ozs7O2tEQU1qQyxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUc7Ozs7Ozs7a0RBTWpDLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRzs7Ozs7OztrREFNakMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHOzs7Ozs7O3dEQXBEakQsQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21DQURqRCxHQUFjOzs7cUNBb0d5QyxHQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBcEdoRSxHQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7K0VBb0d5QyxHQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBNWI1RCxVQUFVO0tBQ1osTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJOztFQUV2QixRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxLQUFLOzs7Ozs7O09BN0JwQyxPQUFPLGdCQUFFLGNBQWM7S0FFOUIsU0FBUztLQUVULE9BQU87S0FDUCxTQUFTO0tBQ1QsTUFBTSxHQUFHLEtBQUs7S0FFZCxhQUFhLEdBQUcsS0FBSzs7S0FFckIsZ0JBQWdCO0VBQ2hCLElBQUksRUFBRSxLQUFLO0VBQ1gsS0FBSyxFQUFFLEtBQUs7RUFDWixVQUFVLEVBQUUsS0FBSzs7O1VBS1osT0FBTyxDQUFDLENBQUM7TUFDWCxDQUFDLEdBQUcsRUFBRTttQkFDTCxhQUFhLEdBQUcsSUFBSTs7bUJBRXBCLGFBQWEsR0FBRyxLQUFLOzs7O1VBWXBCLGNBQWM7TUFDZixZQUFZLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0I7O1lBRXpDLEdBQUcsRUFBRSxLQUFLLEtBQUssWUFBWTttQkFDaEMsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLEtBQUs7Ozs7O1VBTTVCLG1CQUFtQjtNQUVwQixZQUFZLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0I7TUFDOUMsTUFBTSxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVzs7WUFFakMsR0FBRyxFQUFFLEtBQUssS0FBSyxZQUFZO09BQzdCLEdBQUcsS0FBSyxNQUFNO29CQUNiLGdCQUFnQixDQUFDLEdBQUcsSUFBSSxJQUFJOztvQkFFNUIsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLEtBQUs7Ozs7RUFHckMsVUFBVTs7O1VBR0wsWUFBWTtNQUNiLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVE7TUFFaEMsSUFBSSxLQUFLLEdBQUcsa0JBQUUsZ0JBQWdCLENBQUMsSUFBSSxHQUFHLElBQUksOEJBQ3BDLElBQUksS0FBSyxRQUFRLGtCQUFFLGdCQUFnQixDQUFDLEtBQUssR0FBRyxJQUFJLDhCQUNoRCxJQUFJLEtBQUssYUFBYSxrQkFBRSxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsSUFBSTs7O1VBRzlELFNBQVM7a0JBQ2QsU0FBUyxHQUFHLElBQUk7OztDQUdwQixPQUFPO0VBQ0gsWUFBWTs7Ozs7Ozs7Ozs7Ozs7RUE4UzZCLGNBQWM7a0JBQUksZ0JBQWdCLENBQUMsSUFBSSxHQUFHLElBQUk7Ozs7O0dBV3JDLFNBQVM7Ozs7OytDQXFGakMsU0FBUyxHQUFHLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F0Yy9DLENBQUcsV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ2tOSSxJQUFJLEdBQUcsV0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FDQWVNLEdBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvREF0Q3pCLEdBQVM7Ozs7OzsrRUFzQ08sR0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F4UDdELFNBQVM7O1VBRUosU0FBUztrQkFDZCxTQUFTLEdBQUcsSUFBSTs7Ozs7Ozs7OzZDQXFQTSxTQUFTLEdBQUcsS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQ0NuTVosSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRmQsUUFBUSxFQUFFLEdBQUc7SUFBRSxLQUFLLEVBQUUsR0FBRztJQUFFLE1BQU0sRUFBRSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFWN0QsR0FBTzs2QkFTWCxHQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQVRILEdBQU87Ozs7Ozs7Ozs7O21CQVNYLEdBQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBL0NSLE9BQU8sR0FBRyxJQUFJOztDQUVsQixPQUFPO0VBQ0gsVUFBVTs7b0JBQ04sT0FBTyxHQUFHLEtBQUs7O0dBQ2hCLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5QkNvb0JVLEdBQU87eUNBQWtCLEdBQWdCOzs7Ozs7cUNBS3hELEdBQWdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1RUFMRCxHQUFPO2dHQUFrQixHQUFnQjs7OzRCQUt4RCxHQUFnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNW9CVixPQUFPO0tBQ2QsT0FBTyxHQUFHLEtBQUs7S0FDZixnQkFBZ0IsR0FBRyxLQUFLOztDQUU1QixPQUFPO0VBQ04sT0FBTyxHQUFHLElBQUk7O0VBRWQsVUFBVTs7b0JBQ1QsZ0JBQWdCLEdBQUcsSUFBSTs7R0FDckIsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lCQ29CRixHQUFLLElBQUMsS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OytEQUFYLEdBQUssSUFBQyxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQUhkLEdBQUssSUFBQyxPQUFPOzs7OzJDQUxSLEdBQU07d0JBT1YsR0FBRyxpQkFBSSxHQUFLLElBQUMsS0FBSzs7Ozs7O3dCQUpsQixHQUFNOzs7Ozs7Ozs7Ozs7Ozs7d0NBQU4sR0FBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lFQUhGLEdBQU07Ozs7eURBR1YsR0FBTTtpRUFFUCxHQUFLLElBQUMsT0FBTzs7ZUFFWixHQUFHLGlCQUFJLEdBQUssSUFBQyxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcENYLE1BQU07T0FDTixLQUFLO09BRVYsR0FBRyxHQUFHLGFBQW9CLEtBQUssYUFBYTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttRENtQkQsR0FBTSxJQUFDLEtBQUs7K0JBQW5DLEdBQU0sSUFBQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvRkFBTyxHQUFNLElBQUMsS0FBSzs7O21EQUFuQyxHQUFNLElBQUMsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkFIckMsR0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VEQURPLEdBQVEsSUFBQyxDQUFDLGdCQUFRLEdBQU0sSUFBQyxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dURBQTlCLEdBQVEsSUFBQyxDQUFDOzBEQUFRLEdBQU0sSUFBQyxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQVpwQyxNQUFNO09BQ04sS0FBSztPQUNMLE1BQU07T0FDTixRQUFRO09BQ1IsTUFBTTtPQUNOLE1BQU0sR0FBRyxJQUFJO09BQ2IsTUFBTTtDQUVqQixXQUFXLENBQUMsTUFBTTtDQUNsQixVQUFVLENBQUMsV0FBVyxFQUFFLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEIvQjtBQUNBLEFBR0E7QUFDQSxBQUFPLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUN6QjtBQUNBLEFBQU8sTUFBTSxVQUFVLEdBQUc7QUFDMUIsQ0FBQztBQUNELEVBQUUsRUFBRSxFQUFFLE1BQU0sT0FBTyxxQkFBOEIsQ0FBQztBQUNsRCxFQUFFLEdBQUcsRUFBRSx5Q0FBeUM7QUFDaEQsRUFBRTtBQUNGLENBQUM7QUFDRCxFQUFFLEVBQUUsRUFBRSxNQUFNLE9BQU8sMEJBQW1DLENBQUM7QUFDdkQsRUFBRSxHQUFHLEVBQUUsOENBQThDO0FBQ3JELEVBQUU7QUFDRixDQUFDO0FBQ0QsRUFBRSxFQUFFLEVBQUUsTUFBTSxPQUFPLCtCQUFpRCxDQUFDO0FBQ3JFLEVBQUUsR0FBRyxFQUFFLDREQUE0RDtBQUNuRSxFQUFFO0FBQ0YsQ0FBQztBQUNELEVBQUUsRUFBRSxFQUFFLE1BQU0sT0FBTywrQkFBaUQsQ0FBQztBQUNyRSxFQUFFLEdBQUcsRUFBRSw0REFBNEQ7QUFDbkUsRUFBRTtBQUNGLENBQUM7QUFDRCxFQUFFLEVBQUUsRUFBRSxNQUFNLE9BQU8sMEJBQTRDLENBQUM7QUFDaEUsRUFBRSxHQUFHLEVBQUUsdURBQXVEO0FBQzlELEVBQUU7QUFDRixDQUFDO0FBQ0QsRUFBRSxFQUFFLEVBQUUsTUFBTSxPQUFPLHdCQUEwQyxDQUFDO0FBQzlELEVBQUUsR0FBRyxFQUFFLHFEQUFxRDtBQUM1RCxFQUFFO0FBQ0YsQ0FBQztBQUNELEVBQUUsRUFBRSxFQUFFLE1BQU0sT0FBTyx1QkFBeUMsQ0FBQztBQUM3RCxFQUFFLEdBQUcsRUFBRSxvREFBb0Q7QUFDM0QsRUFBRTtBQUNGLENBQUM7QUFDRCxFQUFFLEVBQUUsRUFBRSxNQUFNLE9BQU8sd0JBQWlDLENBQUM7QUFDckQsRUFBRSxHQUFHLEVBQUUsNENBQTRDO0FBQ25ELEVBQUU7QUFDRixDQUFDO0FBQ0QsRUFBRSxFQUFFLEVBQUUsTUFBTSxPQUFPLHFCQUE4QixDQUFDO0FBQ2xELEVBQUUsR0FBRyxFQUFFLHlDQUF5QztBQUNoRCxFQUFFO0FBQ0YsQ0FBQyxDQUFDO0FBQ0Y7QUFDQSxBQUFPLE1BQU0sTUFBTSxHQUFHO0FBQ3RCLENBQUM7QUFDRDtBQUNBLEVBQUUsT0FBTyxFQUFFLE1BQU07QUFDakIsRUFBRSxLQUFLLEVBQUU7QUFDVCxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNYLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxFQUFFLE9BQU8sRUFBRSxtQkFBbUI7QUFDOUIsRUFBRSxLQUFLLEVBQUU7QUFDVCxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNYLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxFQUFFLE9BQU8sRUFBRSxrQ0FBa0M7QUFDN0MsRUFBRSxLQUFLLEVBQUU7QUFDVCxHQUFHLElBQUk7QUFDUCxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNYLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxFQUFFLE9BQU8sRUFBRSxrQ0FBa0M7QUFDN0MsRUFBRSxLQUFLLEVBQUU7QUFDVCxHQUFHLElBQUk7QUFDUCxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNYLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxFQUFFLE9BQU8sRUFBRSw2QkFBNkI7QUFDeEMsRUFBRSxLQUFLLEVBQUU7QUFDVCxHQUFHLElBQUk7QUFDUCxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNYLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxFQUFFLE9BQU8sRUFBRSwyQkFBMkI7QUFDdEMsRUFBRSxLQUFLLEVBQUU7QUFDVCxHQUFHLElBQUk7QUFDUCxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNYLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxFQUFFLE9BQU8sRUFBRSwwQkFBMEI7QUFDckMsRUFBRSxLQUFLLEVBQUU7QUFDVCxHQUFHLElBQUk7QUFDUCxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNYLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxFQUFFLE9BQU8sRUFBRSxpQkFBaUI7QUFDNUIsRUFBRSxLQUFLLEVBQUU7QUFDVCxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNYLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxFQUFFLE9BQU8sRUFBRSxjQUFjO0FBQ3pCLEVBQUUsS0FBSyxFQUFFO0FBQ1QsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDWCxHQUFHO0FBQ0gsRUFBRTtBQUNGLENBQUMsQ0FBQztBQUNGO0FBQ0EsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7QUFDbkMsQ0FBQyxPQUFPLGlDQUEwRixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSTtBQUNuSCxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEIsRUFBRSxDQUFDLENBQUM7QUFDSjs7Q0FBQyxEQzNIRCxTQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxHQUFHLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFO0FBQ3BELENBQUMsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUMvRDtBQUNBLENBQUMsSUFBSSxNQUFNLEVBQUU7QUFDYixFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLGNBQWMsR0FBRyxXQUFXLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDcEYsRUFBRSxPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDL0MsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUN0QixDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFVBQVUsQ0FBQyxLQUFLLEVBQUU7QUFDM0IsQ0FBQyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDbEI7QUFDQSxDQUFDLFNBQVMsTUFBTSxHQUFHO0FBQ25CLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQztBQUNmLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUM7QUFDM0IsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxTQUFTLEVBQUU7QUFDekIsRUFBRSxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ2hCLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN2QixFQUFFO0FBQ0Y7QUFDQSxDQUFDLFNBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRTtBQUN6QixFQUFFLElBQUksU0FBUyxDQUFDO0FBQ2hCLEVBQUUsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxLQUFLO0FBQ3BDLEdBQUcsSUFBSSxTQUFTLEtBQUssU0FBUyxLQUFLLEtBQUssSUFBSSxLQUFLLEtBQUssU0FBUyxDQUFDLEVBQUU7QUFDbEUsSUFBSSxHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQzNCLElBQUk7QUFDSixHQUFHLENBQUMsQ0FBQztBQUNMLEVBQUU7QUFDRjtBQUNBLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUM7QUFDbkMsQ0FBQztBQUNEO0FBQ0EsTUFBTSxZQUFZLEdBQUcsT0FBTyxVQUFVLEtBQUssV0FBVyxJQUFJLFVBQVUsQ0FBQztBQUNyRTtBQUNBLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNsQixJQUFJLGNBQWMsQ0FBQztBQUNuQixJQUFJLGFBQWEsQ0FBQztBQUNsQixJQUFJLGNBQWMsQ0FBQztBQUNuQixJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDeEIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQ3pCO0FBQ0EsTUFBTSxNQUFNLEdBQUc7QUFDZixDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDO0FBQ3JCLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDM0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLFlBQVksSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDO0FBQ3hELENBQUMsQ0FBQztBQUNGO0FBQ0EsSUFBSSxRQUFRLENBQUM7QUFDYixJQUFJLGFBQWEsQ0FBQztBQUNsQjtBQUNBLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxJQUFJO0FBQ3hDLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztBQUNsQjtBQUNBLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPO0FBQ3BCLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztBQUN0QjtBQUNBLENBQUMsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3REO0FBQ0EsQ0FBQyxNQUFNLEtBQUssR0FBRyxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBQ2xDLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbEUsQ0FBQyxJQUFJLEtBQUssS0FBSyxhQUFhLEVBQUUsT0FBTztBQUNyQztBQUNBLENBQUMsTUFBTSxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BELENBQUMsQ0FBQyxDQUFDO0FBQ0g7QUFDQSxJQUFJLFdBQVc7QUFDZjtBQUNBO0FBQ0EsR0FBRyxJQUFJLENBQUM7QUFDUixTQUFTLGVBQWUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ3hDLENBQUMsV0FBVyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO0FBQ2pDLENBQUM7QUFDRDtBQUNBLElBQUksTUFBTSxDQUFDO0FBQ1gsU0FBUyxVQUFVLENBQUMsT0FBTyxFQUFFO0FBQzdCLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUNsQixDQUFDO0FBQ0Q7QUFDQSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDWixTQUFTLE9BQU8sQ0FBQyxDQUFDLEVBQUU7QUFDcEIsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQ1QsQ0FBQztBQUNEO0FBQ0EsSUFBSSxHQUFHLENBQUM7QUFDUixTQUFTLE9BQU8sQ0FBQyxDQUFDLEVBQUU7QUFDcEIsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQ1QsQ0FBQztBQUNEO0FBQ0EsTUFBTSxRQUFRLEdBQUcsT0FBTyxPQUFPLEtBQUssV0FBVyxHQUFHLE9BQU8sR0FBRztBQUM1RCxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxLQUFLLEVBQUU7QUFDdEMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksS0FBSyxFQUFFO0FBQ3pDLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtBQUN0QixDQUFDLENBQUM7QUFDRjtBQUNBLE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUMxQjtBQUNBLFNBQVMsYUFBYSxDQUFDLE1BQU0sRUFBRTtBQUMvQixDQUFDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3hCLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSTtBQUNwRCxHQUFHLElBQUksR0FBRyxHQUFHLEVBQUUsS0FBSyxHQUFHLEVBQUUsQ0FBQyxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0csR0FBRyxJQUFJLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNqRSxHQUFHLElBQUksT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNqRSxRQUFRLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDM0IsR0FBRyxDQUFDLENBQUM7QUFDTCxFQUFFO0FBQ0YsQ0FBQyxPQUFPLEtBQUssQ0FBQztBQUNkLENBQUM7QUFDRDtBQUNBLFNBQVMsYUFBYSxDQUFDLEdBQUcsRUFBRTtBQUM1QixDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsTUFBTSxFQUFFLE9BQU8sSUFBSSxDQUFDO0FBQ2pELENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLElBQUksQ0FBQztBQUNqRTtBQUNBLENBQUMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM1RDtBQUNBLENBQUMsSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO0FBQ2xCLEVBQUUsSUFBSSxHQUFHLEdBQUcsQ0FBQztBQUNiLEVBQUU7QUFDRjtBQUNBO0FBQ0EsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPO0FBQ3hEO0FBQ0EsQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzVDLEVBQUUsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFCO0FBQ0EsRUFBRSxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QztBQUNBLEVBQUUsSUFBSSxLQUFLLEVBQUU7QUFDYixHQUFHLE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0MsR0FBRyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3BELEdBQUcsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN4RDtBQUNBLEdBQUcsTUFBTSxJQUFJLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO0FBQzdEO0FBQ0EsR0FBRyxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztBQUNqRCxHQUFHO0FBQ0gsRUFBRTtBQUNGLENBQUM7QUFDRDtBQUNBLFNBQVMsWUFBWSxDQUFDLEdBQUcsRUFBRTtBQUMzQixDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQztBQUM3QyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxZQUFZLENBQUM7QUFDNUQ7QUFDQSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7QUFDdEIsRUFBRSxjQUFjLEdBQUcsU0FBUyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3QyxFQUFFO0FBQ0Y7QUFDQSxDQUFDLE1BQU0sS0FBSyxHQUFHO0FBQ2YsRUFBRSxLQUFLO0FBQ1AsRUFBRSxNQUFNO0FBQ1IsRUFBRSxPQUFPO0FBQ1QsRUFBRSxNQUFNLEVBQUU7QUFDVixHQUFHLEtBQUssRUFBRSxjQUFjO0FBQ3hCLEdBQUc7QUFDSCxFQUFFLE1BQU0sRUFBRTtBQUNWLEdBQUcsS0FBSyxFQUFFO0FBQ1YsSUFBSSxNQUFNO0FBQ1YsSUFBSSxLQUFLO0FBQ1QsSUFBSTtBQUNKLEdBQUcsU0FBUyxFQUFFQyxPQUFjO0FBQzVCLEdBQUc7QUFDSCxFQUFFLFFBQVEsRUFBRSxTQUFTO0FBQ3JCO0FBQ0EsRUFBRSxDQUFDO0FBQ0gsQ0FBQyxNQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDckMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDdEUsQ0FBQztBQUNEO0FBQ0EsU0FBUyxZQUFZLEdBQUc7QUFDeEIsQ0FBQyxPQUFPO0FBQ1IsRUFBRSxDQUFDLEVBQUUsV0FBVztBQUNoQixFQUFFLENBQUMsRUFBRSxXQUFXO0FBQ2hCLEVBQUUsQ0FBQztBQUNILENBQUM7QUFDRDtBQUNBLGVBQWUsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtBQUNwRCxDQUFDLElBQUksRUFBRSxFQUFFO0FBQ1Q7QUFDQSxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDWCxFQUFFLE1BQU07QUFDUixFQUFFLE1BQU0sY0FBYyxHQUFHLFlBQVksRUFBRSxDQUFDO0FBQ3hDO0FBQ0E7QUFDQSxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxjQUFjLENBQUM7QUFDdkM7QUFDQSxFQUFFLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUM7QUFDbkIsRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxHQUFHLGNBQWMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQ25FLEVBQUU7QUFDRjtBQUNBLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNWO0FBQ0EsQ0FBQyxJQUFJLGNBQWMsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqRDtBQUNBLENBQUMsTUFBTSxNQUFNLEdBQUcsV0FBVyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLElBQUk7QUFDL0QsRUFBRSxXQUFXLENBQUMsT0FBTztBQUNyQixFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN6QjtBQUNBLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztBQUNwQjtBQUNBLENBQUMsTUFBTSxLQUFLLEdBQUcsYUFBYSxHQUFHLEVBQUUsQ0FBQztBQUNsQyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDO0FBQ2xELENBQUMsSUFBSSxLQUFLLEtBQUssYUFBYSxFQUFFLE9BQU87QUFDckM7QUFDQSxDQUFDLE1BQU0sTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwRCxDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzNEO0FBQ0EsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQ2hCLEVBQUUsSUFBSSxNQUFNLEdBQUcsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2xDO0FBQ0EsRUFBRSxJQUFJLElBQUksRUFBRTtBQUNaO0FBQ0EsR0FBRyxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5RDtBQUNBLEdBQUcsSUFBSSxXQUFXLEVBQUU7QUFDcEIsSUFBSSxNQUFNLEdBQUc7QUFDYixLQUFLLENBQUMsRUFBRSxDQUFDO0FBQ1QsS0FBSyxDQUFDLEVBQUUsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUMsR0FBRyxHQUFHLE9BQU87QUFDekQsS0FBSyxDQUFDO0FBQ04sSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUMvQixFQUFFLElBQUksTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMzQyxFQUFFO0FBQ0YsQ0FBQztBQUNEO0FBQ0EsZUFBZSxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO0FBQ3JELENBQUMsSUFBSSxRQUFRLEVBQUUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3RFO0FBQ0EsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QixDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzlCO0FBQ0EsQ0FBQyxJQUFJLGNBQWMsRUFBRTtBQUNyQixFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDN0IsRUFBRSxNQUFNO0FBQ1IsRUFBRSxLQUFLLENBQUMsTUFBTSxHQUFHO0FBQ2pCLEdBQUcsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQzdDLEdBQUcsVUFBVSxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFO0FBQ3pELEdBQUcsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO0FBQzFCLEdBQUcsQ0FBQztBQUNKLEVBQUUsS0FBSyxDQUFDLE1BQU0sR0FBRztBQUNqQixHQUFHLEtBQUssRUFBRSxNQUFNLGNBQWM7QUFDOUIsR0FBRyxDQUFDO0FBQ0osRUFBRSxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ3BDO0FBQ0E7QUFDQSxFQUFFLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUM3RCxFQUFFLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUN6RDtBQUNBLEVBQUUsSUFBSSxLQUFLLElBQUksR0FBRyxFQUFFO0FBQ3BCLEdBQUcsT0FBTyxLQUFLLENBQUMsV0FBVyxLQUFLLEdBQUcsRUFBRUMsUUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMvRCxHQUFHQSxRQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakIsR0FBR0EsUUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsR0FBRztBQUNIO0FBQ0EsRUFBRSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUM7QUFDM0IsR0FBRyxNQUFNO0FBQ1QsR0FBRyxLQUFLO0FBQ1IsR0FBRyxPQUFPLEVBQUUsSUFBSTtBQUNoQixHQUFHLENBQUMsQ0FBQztBQUNMLEVBQUU7QUFDRjtBQUNBLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztBQUN6QixDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1QyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDZCxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFDdkIsQ0FBQztBQUNEO0FBQ0EsU0FBUyxZQUFZLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUU7QUFDNUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxJQUFJLGlCQUFpQixLQUFLLGFBQWEsRUFBRSxPQUFPLElBQUksQ0FBQztBQUN0RDtBQUNBLENBQUMsTUFBTSxRQUFRLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BDO0FBQ0EsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzdCLENBQUMsSUFBSSxPQUFPLEtBQUssUUFBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLElBQUksQ0FBQztBQUMvQyxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTtBQUNyQixFQUFFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUNoRyxHQUFHLE9BQU8sSUFBSSxDQUFDO0FBQ2YsR0FBRztBQUNILEVBQUU7QUFDRixDQUFDO0FBQ0Q7QUFDQSxlQUFlLGNBQWMsQ0FBQyxNQUFNO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDO0FBQ2hDLENBQUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZEO0FBQ0EsQ0FBQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDckI7QUFDQSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDckU7QUFDQSxDQUFDLE1BQU0sZUFBZSxHQUFHO0FBQ3pCLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksS0FBSyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztBQUN4QyxFQUFFLFFBQVEsRUFBRSxDQUFDLFVBQVUsRUFBRSxRQUFRLEtBQUs7QUFDdEMsR0FBRyxJQUFJLFFBQVEsS0FBSyxRQUFRLENBQUMsVUFBVSxLQUFLLFVBQVUsSUFBSSxRQUFRLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxFQUFFO0FBQzNGLElBQUksTUFBTSxJQUFJLEtBQUssQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztBQUM3QyxJQUFJO0FBQ0osR0FBRyxRQUFRLEdBQUcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUM7QUFDdkMsR0FBRztBQUNILEVBQUUsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssS0FBSztBQUM1QixHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxHQUFHLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUN0RSxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3pCLEdBQUc7QUFDSCxFQUFFLENBQUM7QUFDSDtBQUNBLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtBQUN0QixFQUFFLGNBQWMsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJQyxPQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtBQUNuRixHQUFHLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtBQUNsQixHQUFHLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtBQUNsQixHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztBQUNwQixHQUFHLE1BQU0sRUFBRSxFQUFFO0FBQ2IsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2YsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxJQUFJLE1BQU0sQ0FBQztBQUNaLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ1g7QUFDQSxDQUFDLElBQUk7QUFDTCxFQUFFLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkQsRUFBRSxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUM7QUFDQSxFQUFFLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztBQUM1QjtBQUNBLEVBQUUsTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLEtBQUs7QUFDaEUsR0FBRyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7QUFDQSxHQUFHLElBQUksWUFBWSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixDQUFDLEVBQUUsYUFBYSxHQUFHLElBQUksQ0FBQztBQUNoRjtBQUNBLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7QUFDakM7QUFDQSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0FBQ2pCO0FBQ0EsR0FBRyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsYUFBYSxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDbkcsSUFBSSxPQUFPLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3QixJQUFJO0FBQ0o7QUFDQSxHQUFHLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFDekI7QUFDQSxHQUFHLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0sY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwRjtBQUNBLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFDakIsR0FBRyxJQUFJLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQ2hELElBQUksU0FBUyxHQUFHLE9BQU87QUFDdkIsT0FBTyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO0FBQzNDLE1BQU0sSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO0FBQ3JCLE1BQU0sSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO0FBQ3JCLE1BQU0sS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO0FBQ3ZCLE1BQU0sTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTtBQUMxRCxNQUFNLEVBQUUsUUFBUSxDQUFDO0FBQ2pCLE9BQU8sRUFBRSxDQUFDO0FBQ1YsSUFBSSxNQUFNO0FBQ1YsSUFBSSxTQUFTLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDOUMsSUFBSTtBQUNKO0FBQ0EsR0FBRyxRQUFRLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDL0YsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNOLEVBQUUsQ0FBQyxPQUFPLEtBQUssRUFBRTtBQUNqQixFQUFFLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ3RCLEVBQUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDckIsRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2QsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztBQUNwQyxDQUFDO0FBQ0Q7QUFDQSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUU7QUFDekIsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ2hDLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU87QUFDNUQ7QUFDQSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxLQUFLO0FBQ3hDLEVBQUUsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM5QyxFQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDO0FBQzFCLEVBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDbkI7QUFDQSxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxNQUFNLEVBQUUsQ0FBQztBQUMvQixFQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0FBQ3hCO0FBQ0EsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsQyxFQUFFLENBQUMsQ0FBQztBQUNKLENBQUM7QUFDRDtBQUNBLFNBQVMsY0FBYyxDQUFDLFNBQVM7QUFDakM7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQyxNQUFNLFFBQVEsSUFBSSxPQUFPLFNBQVMsQ0FBQyxHQUFHLEtBQUssUUFBUSxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ3pGLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNsQyxDQUFDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hELENBQUM7QUFDRDtBQUNBLFNBQVNELFFBQU0sQ0FBQyxJQUFJLEVBQUU7QUFDdEIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBQ0Q7QUFDQSxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUU7QUFDeEIsQ0FBQyxNQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQy9EO0FBQ0EsQ0FBQyxJQUFJLE1BQU0sRUFBRTtBQUNiLEVBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLEtBQUssV0FBVyxDQUFDLElBQUksRUFBRTtBQUNqRCxHQUFHLGVBQWUsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDakQsR0FBRztBQUNIO0FBQ0EsRUFBRSxPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUM7QUFDN0IsRUFBRTtBQUNGLENBQUM7QUFDRDtBQUNBLFNBQVMsS0FBSyxDQUFDLElBQUk7QUFDbkI7QUFDQSxFQUFFO0FBQ0YsQ0FBQyxJQUFJLG1CQUFtQixJQUFJLFFBQVEsRUFBRTtBQUN0QyxFQUFFLFFBQVEsQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUM7QUFDeEMsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxNQUFNO0FBQ3hDLEVBQUUsUUFBUSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztBQUN0QyxFQUFFLENBQUMsQ0FBQztBQUNKO0FBQ0E7QUFDQSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxNQUFNO0FBQ2hDLEVBQUUsUUFBUSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztBQUN4QyxFQUFFLENBQUMsQ0FBQztBQUNKO0FBQ0EsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pCO0FBQ0EsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDekMsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFDL0M7QUFDQTtBQUNBLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDbEQsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUNqRDtBQUNBLENBQUMsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU07QUFDckMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQztBQUNsQztBQUNBLEVBQUUsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDL0M7QUFDQSxFQUFFLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQztBQUNBLEVBQUUsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sWUFBWSxFQUFFLENBQUM7QUFDaEQ7QUFDQSxFQUFFLE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQyxFQUFFLElBQUksTUFBTSxFQUFFLE9BQU8sUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3ZELEVBQUUsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUNEO0FBQ0EsSUFBSSxpQkFBaUIsQ0FBQztBQUN0QjtBQUNBLFNBQVMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFO0FBQ2pDLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDakMsQ0FBQyxpQkFBaUIsR0FBRyxVQUFVLENBQUMsTUFBTTtBQUN0QyxFQUFFLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFCLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNSLENBQUM7QUFDRDtBQUNBLFNBQVMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFO0FBQ2pDLENBQUMsTUFBTSxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNyQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxVQUFVLEVBQUUsT0FBTztBQUN4QztBQUNBLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsQixDQUFDO0FBQ0Q7QUFDQSxTQUFTLFlBQVksQ0FBQyxLQUFLLEVBQUU7QUFDN0I7QUFDQTtBQUNBLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU87QUFDaEMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU87QUFDOUQsQ0FBQyxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPO0FBQ3BDO0FBQ0EsQ0FBQyxNQUFNLENBQUMsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3JDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPO0FBQ2hCO0FBQ0EsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLENBQUMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssbUJBQW1CLENBQUM7QUFDM0YsQ0FBQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3REO0FBQ0EsQ0FBQyxJQUFJLElBQUksS0FBSyxRQUFRLENBQUMsSUFBSSxFQUFFO0FBQzdCLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQzdDLEVBQUUsT0FBTztBQUNULEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssVUFBVSxFQUFFLE9BQU87QUFDaEY7QUFDQTtBQUNBLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLE9BQU87QUFDakQ7QUFDQSxDQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNCO0FBQ0E7QUFDQSxDQUFDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLE1BQU0sRUFBRSxPQUFPO0FBQ2xGO0FBQ0EsQ0FBQyxNQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkMsQ0FBQyxJQUFJLE1BQU0sRUFBRTtBQUNiLEVBQUUsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3JELEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QyxFQUFFLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN6QixFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoRCxFQUFFO0FBQ0YsQ0FBQztBQUNEO0FBQ0EsU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFO0FBQ3RCLENBQUMsT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7QUFDMUQsQ0FBQztBQUNEO0FBQ0EsU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFO0FBQzNCLENBQUMsT0FBTyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxHQUFHLEVBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDNUUsQ0FBQyxPQUFPLElBQUksQ0FBQztBQUNiLENBQUM7QUFDRDtBQUNBLFNBQVMsZUFBZSxDQUFDLEtBQUssRUFBRTtBQUNoQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxZQUFZLEVBQUUsQ0FBQztBQUN0QztBQUNBLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO0FBQ2xCLEVBQUUsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JDLEVBQUUsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BDLEVBQUUsSUFBSSxNQUFNLEVBQUU7QUFDZCxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNwQyxHQUFHLE1BQU07QUFDVCxHQUFHLFFBQVEsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztBQUNqQyxHQUFHO0FBQ0gsRUFBRSxNQUFNO0FBQ1I7QUFDQSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbkIsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDZixFQUFFLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4RCxFQUFFO0FBQ0YsQ0FBQztBQUNELEFBV0E7QUFDQSxNQUFNLFFBQVEsR0FBRyxNQUFNLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUMza0IvQ0UsS0FBWSxDQUFDO0FBQ2IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7QUFDMUMsQ0FBQyxDQUFDOzs7OyJ9