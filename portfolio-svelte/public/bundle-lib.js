
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
var app = (function () {
    'use strict';

    function noop() { }
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
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_data(text, data) {
        data = '' + data;
        if (text.data !== data)
            text.data = data;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
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
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment) {
            $$.update($$.dirty);
            run_all($$.before_update);
            $$.fragment.p($$.dirty, $$.ctx);
            $$.dirty = null;
            $$.after_update.forEach(add_render_callback);
        }
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
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment.m(target, anchor);
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
        if (component.$$.fragment) {
            run_all(component.$$.on_destroy);
            component.$$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            component.$$.on_destroy = component.$$.fragment = null;
            component.$$.ctx = {};
        }
    }
    function make_dirty(component, key) {
        if (!component.$$.dirty) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty = blank_object();
        }
        component.$$.dirty[key] = true;
    }
    function init(component, options, instance, create_fragment, not_equal, prop_names) {
        const parent_component = current_component;
        set_current_component(component);
        const props = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props: prop_names,
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
            dirty: null
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, props, (key, value) => {
                if ($$.ctx && not_equal($$.ctx[key], $$.ctx[key] = value)) {
                    if ($$.bound[key])
                        $$.bound[key](value);
                    if (ready)
                        make_dirty(component, key);
                }
            })
            : props;
        $$.update();
        ready = true;
        run_all($$.before_update);
        $$.fragment = create_fragment($$.ctx);
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.c();
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
        $set() {
            // overridden by instance, if it has props
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    /* src/Components/NavItem.svelte generated by Svelte v3.7.1 */

    const file = "src/Components/NavItem.svelte";

    function create_fragment(ctx) {
    	var a, t;

    	return {
    		c: function create() {
    			a = element("a");
    			t = text(ctx.name);
    			attr(a, "href", ctx.url);
    			attr(a, "class", "svelte-1khbzr9");
    			add_location(a, file, 53, 1, 1095);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, a, anchor);
    			append(a, t);
    		},

    		p: function update(changed, ctx) {
    			if (changed.name) {
    				set_data(t, ctx.name);
    			}

    			if (changed.url) {
    				attr(a, "href", ctx.url);
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(a);
    			}
    		}
    	};
    }

    function instance($$self, $$props, $$invalidate) {
    	let { name, url } = $$props;

    	const writable_props = ['name', 'url'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<NavItem> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('name' in $$props) $$invalidate('name', name = $$props.name);
    		if ('url' in $$props) $$invalidate('url', url = $$props.url);
    	};

    	return { name, url };
    }

    class NavItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, ["name", "url"]);

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.name === undefined && !('name' in props)) {
    			console.warn("<NavItem> was created without expected prop 'name'");
    		}
    		if (ctx.url === undefined && !('url' in props)) {
    			console.warn("<NavItem> was created without expected prop 'url'");
    		}
    	}

    	get name() {
    		throw new Error("<NavItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<NavItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<NavItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<NavItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/HamburgerIcon.svelte generated by Svelte v3.7.1 */

    const file$1 = "src/Components/HamburgerIcon.svelte";

    function create_fragment$1(ctx) {
    	var input, t, label, span;

    	return {
    		c: function create() {
    			input = element("input");
    			t = space();
    			label = element("label");
    			span = element("span");
    			attr(input, "class", "hide-for-medium hamburger-check svelte-iser82");
    			attr(input, "id", "hamburger");
    			attr(input, "name", "hamburger");
    			attr(input, "type", "checkbox");
    			add_location(input, file$1, 88, 0, 1970);
    			attr(span, "class", "hamburger-lines svelte-iser82");
    			add_location(span, file$1, 90, 4, 2156);
    			attr(label, "class", "hide-for-medium center-all svelte-iser82");
    			attr(label, "for", "hamburger");
    			add_location(label, file$1, 89, 0, 2093);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, input, anchor);
    			ctx.input_binding(input);
    			insert(target, t, anchor);
    			insert(target, label, anchor);
    			append(label, span);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(input);
    			}

    			ctx.input_binding(null);

    			if (detaching) {
    				detach(t);
    				detach(label);
    			}
    		}
    	};
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let hamburgerCheck;
        onMount(()=>{
            if(window.innerWidth > 640)
           setTimeout(()=>{
                 hamburgerCheck.checked = true; $$invalidate('hamburgerCheck', hamburgerCheck);
           }, 300);
        });

    	function input_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			$$invalidate('hamburgerCheck', hamburgerCheck = $$value);
    		});
    	}

    	return { hamburgerCheck, input_binding };
    }

    class HamburgerIcon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, []);
    	}
    }

    /* src/Components/NavContainer.svelte generated by Svelte v3.7.1 */

    const file$2 = "src/Components/NavContainer.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.navItem = list[i];
    	return child_ctx;
    }

    // (113:12) {#each navItems as navItem}
    function create_each_block(ctx) {
    	var li, t0, span, t1, current;

    	var navitem = new NavItem({
    		props: { name: ctx.navItem.name, url: ctx.navItem.url },
    		$$inline: true
    	});

    	return {
    		c: function create() {
    			li = element("li");
    			navitem.$$.fragment.c();
    			t0 = space();
    			span = element("span");
    			t1 = space();
    			attr(span, "class", "nav-separator svelte-a1phb2");
    			add_location(span, file$2, 114, 70, 2479);
    			attr(li, "class", "align-center svelte-a1phb2");
    			add_location(li, file$2, 113, 16, 2383);
    		},

    		m: function mount(target, anchor) {
    			insert(target, li, anchor);
    			mount_component(navitem, li, null);
    			append(li, t0);
    			append(li, span);
    			append(li, t1);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var navitem_changes = {};
    			if (changed.navItems) navitem_changes.name = ctx.navItem.name;
    			if (changed.navItems) navitem_changes.url = ctx.navItem.url;
    			navitem.$set(navitem_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(navitem.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(navitem.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(li);
    			}

    			destroy_component(navitem);
    		}
    	};
    }

    function create_fragment$2(ctx) {
    	var aside, nav, t, ul, current;

    	var hamburgericon = new HamburgerIcon({ $$inline: true });

    	var each_value = ctx.navItems;

    	var each_blocks = [];

    	for (var i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	return {
    		c: function create() {
    			aside = element("aside");
    			nav = element("nav");
    			hamburgericon.$$.fragment.c();
    			t = space();
    			ul = element("ul");

    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}
    			attr(ul, "class", "svelte-a1phb2");
    			add_location(ul, file$2, 111, 8, 2322);
    			attr(nav, "class", "svelte-a1phb2");
    			add_location(nav, file$2, 109, 4, 2282);
    			attr(aside, "class", "svelte-a1phb2");
    			add_location(aside, file$2, 108, 0, 2270);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, aside, anchor);
    			append(aside, nav);
    			mount_component(hamburgericon, nav, null);
    			append(nav, t);
    			append(nav, ul);

    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (changed.navItems) {
    				each_value = ctx.navItems;

    				for (var i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ul, null);
    					}
    				}

    				group_outros();
    				for (i = each_value.length; i < each_blocks.length; i += 1) out(i);
    				check_outros();
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(hamburgericon.$$.fragment, local);

    			for (var i = 0; i < each_value.length; i += 1) transition_in(each_blocks[i]);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(hamburgericon.$$.fragment, local);

    			each_blocks = each_blocks.filter(Boolean);
    			for (let i = 0; i < each_blocks.length; i += 1) transition_out(each_blocks[i]);

    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(aside);
    			}

    			destroy_component(hamburgericon);

    			destroy_each(each_blocks, detaching);
    		}
    	};
    }

    function instance$2($$self) {
    	

    let navItems = [
        {
            name: 'about',
            url: ''
        },
        {
            name: 'portfolio',
            url: ''
        },
        {
            name: 'contact',
            url: ''
        }
    ];

    	return { navItems };
    }

    class NavContainer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, []);
    	}
    }

    /* src/Components/StripeBackground.svelte generated by Svelte v3.7.1 */

    const file$3 = "src/Components/StripeBackground.svelte";

    function create_fragment$3(ctx) {
    	var span;

    	return {
    		c: function create() {
    			span = element("span");
    			attr(span, "class", "stripes svelte-l3adpc");
    			add_location(span, file$3, 47, 0, 978);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, span, anchor);
    			ctx.span_binding(span);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(span);
    			}

    			ctx.span_binding(null);
    		}
    	};
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let stripes;
    onMount(()=>{
         setTimeout(()=>{stripes.style.left = 0; $$invalidate('stripes', stripes);},200);
    });

    	function span_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			$$invalidate('stripes', stripes = $$value);
    		});
    	}

    	return { stripes, span_binding };
    }

    class StripeBackground extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, []);
    	}
    }

    /* src/Components/HeroImg.svelte generated by Svelte v3.7.1 */

    const file$4 = "src/Components/HeroImg.svelte";

    function create_fragment$4(ctx) {
    	var div1, div0, t, span;

    	return {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t = space();
    			span = element("span");
    			attr(div0, "class", "overlay boxes svelte-3hq9hz");
    			add_location(div0, file$4, 147, 4, 3052);
    			attr(span, "class", "gradient-animate svelte-3hq9hz");
    			add_location(span, file$4, 150, 5, 3104);
    			attr(div1, "class", "hero-image svelte-3hq9hz");
    			add_location(div1, file$4, 146, 0, 3023);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div1, anchor);
    			append(div1, div0);
    			append(div1, t);
    			append(div1, span);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div1);
    			}
    		}
    	};
    }

    class HeroImg extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$4, safe_not_equal, []);
    	}
    }

    /* src/Components/HeroLeftText.svelte generated by Svelte v3.7.1 */

    const file$5 = "src/Components/HeroLeftText.svelte";

    function create_fragment$5(ctx) {
    	var p, span0, t_1, span1;

    	return {
    		c: function create() {
    			p = element("p");
    			span0 = element("span");
    			span0.textContent = "Developer";
    			t_1 = space();
    			span1 = element("span");
    			span1.textContent = "Designer";
    			attr(span0, "class", "svelte-3npmah");
    			add_location(span0, file$5, 102, 0, 1775);
    			attr(span1, "class", "svelte-3npmah");
    			add_location(span1, file$5, 103, 0, 1798);
    			attr(p, "class", "svelte-3npmah");
    			add_location(p, file$5, 101, 0, 1771);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, p, anchor);
    			append(p, span0);
    			append(p, t_1);
    			append(p, span1);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(p);
    			}
    		}
    	};
    }

    class HeroLeftText extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$5, safe_not_equal, []);
    	}
    }

    /* src/Components/HeroRightText.svelte generated by Svelte v3.7.1 */

    const file$6 = "src/Components/HeroRightText.svelte";

    function create_fragment$6(ctx) {
    	var p, span0, t1, span1, t3, span2, t5, span3, t7, span4;

    	return {
    		c: function create() {
    			p = element("p");
    			span0 = element("span");
    			span0.textContent = "Innovative";
    			t1 = space();
    			span1 = element("span");
    			span1.textContent = "|";
    			t3 = space();
    			span2 = element("span");
    			span2.textContent = "Bold";
    			t5 = space();
    			span3 = element("span");
    			span3.textContent = "|";
    			t7 = space();
    			span4 = element("span");
    			span4.textContent = "Creative";
    			attr(span0, "class", "text svelte-8nctdd");
    			add_location(span0, file$6, 73, 4, 1063);
    			attr(span1, "class", "seperator svelte-8nctdd");
    			add_location(span1, file$6, 73, 41, 1100);
    			attr(span2, "class", "text svelte-8nctdd");
    			add_location(span2, file$6, 74, 4, 1137);
    			attr(span3, "class", "seperator svelte-8nctdd");
    			add_location(span3, file$6, 74, 35, 1168);
    			attr(span4, "class", "text svelte-8nctdd");
    			add_location(span4, file$6, 75, 4, 1205);
    			attr(p, "class", "svelte-8nctdd");
    			add_location(p, file$6, 72, 0, 1055);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, p, anchor);
    			append(p, span0);
    			append(p, t1);
    			append(p, span1);
    			append(p, t3);
    			append(p, span2);
    			append(p, t5);
    			append(p, span3);
    			append(p, t7);
    			append(p, span4);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(p);
    			}
    		}
    	};
    }

    class HeroRightText extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$6, safe_not_equal, []);
    	}
    }

    /* src/Components/HeroArrowDown.svelte generated by Svelte v3.7.1 */

    const file$7 = "src/Components/HeroArrowDown.svelte";

    function create_fragment$7(ctx) {
    	var a, span;

    	return {
    		c: function create() {
    			a = element("a");
    			span = element("span");
    			attr(span, "class", "svelte-7th09u");
    			add_location(span, file$7, 40, 12, 762);
    			attr(a, "href", "#");
    			attr(a, "class", "svelte-7th09u");
    			add_location(a, file$7, 40, 0, 750);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, a, anchor);
    			append(a, span);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(a);
    			}
    		}
    	};
    }

    class HeroArrowDown extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$7, safe_not_equal, []);
    	}
    }

    /* src/Components/HeroSocial.svelte generated by Svelte v3.7.1 */

    const file$8 = "src/Components/HeroSocial.svelte";

    function create_fragment$8(ctx) {
    	var div, i0, t0, i1, t1, i2;

    	return {
    		c: function create() {
    			div = element("div");
    			i0 = element("i");
    			t0 = space();
    			i1 = element("i");
    			t1 = space();
    			i2 = element("i");
    			attr(i0, "class", "fab fa-github svelte-p90x6c");
    			add_location(i0, file$8, 17, 4, 198);
    			attr(i1, "class", "fab fa-linkedin svelte-p90x6c");
    			add_location(i1, file$8, 18, 4, 232);
    			attr(i2, "class", "fas fa-envelope svelte-p90x6c");
    			add_location(i2, file$8, 19, 4, 268);
    			attr(div, "class", "social-container svelte-p90x6c");
    			add_location(div, file$8, 16, 0, 163);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div, anchor);
    			append(div, i0);
    			append(div, t0);
    			append(div, i1);
    			append(div, t1);
    			append(div, i2);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div);
    			}
    		}
    	};
    }

    class HeroSocial extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$8, safe_not_equal, []);
    	}
    }

    /* src/Components/HeroSection.svelte generated by Svelte v3.7.1 */

    const file$9 = "src/Components/HeroSection.svelte";

    function create_fragment$9(ctx) {
    	var div2, div0, t0, t1, div1, t2, t3, current;

    	var herolefttext = new HeroLeftText({ $$inline: true });

    	var heroimg = new HeroImg({ $$inline: true });

    	var herorighttext = new HeroRightText({ $$inline: true });

    	var heroarrowdown = new HeroArrowDown({ $$inline: true });

    	var herosocial = new HeroSocial({ $$inline: true });

    	return {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			herolefttext.$$.fragment.c();
    			t0 = space();
    			heroimg.$$.fragment.c();
    			t1 = space();
    			div1 = element("div");
    			herorighttext.$$.fragment.c();
    			t2 = space();
    			heroarrowdown.$$.fragment.c();
    			t3 = space();
    			herosocial.$$.fragment.c();
    			attr(div0, "class", "hero-text svelte-9k9vqb");
    			add_location(div0, file$9, 22, 4, 517);
    			attr(div1, "class", "hero-text svelte-9k9vqb");
    			add_location(div1, file$9, 26, 4, 597);
    			attr(div2, "class", "hero-container center-all svelte-9k9vqb");
    			add_location(div2, file$9, 21, 0, 473);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div2, anchor);
    			append(div2, div0);
    			mount_component(herolefttext, div0, null);
    			append(div2, t0);
    			mount_component(heroimg, div2, null);
    			append(div2, t1);
    			append(div2, div1);
    			mount_component(herorighttext, div1, null);
    			insert(target, t2, anchor);
    			mount_component(heroarrowdown, target, anchor);
    			insert(target, t3, anchor);
    			mount_component(herosocial, target, anchor);
    			current = true;
    		},

    		p: noop,

    		i: function intro(local) {
    			if (current) return;
    			transition_in(herolefttext.$$.fragment, local);

    			transition_in(heroimg.$$.fragment, local);

    			transition_in(herorighttext.$$.fragment, local);

    			transition_in(heroarrowdown.$$.fragment, local);

    			transition_in(herosocial.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(herolefttext.$$.fragment, local);
    			transition_out(heroimg.$$.fragment, local);
    			transition_out(herorighttext.$$.fragment, local);
    			transition_out(heroarrowdown.$$.fragment, local);
    			transition_out(herosocial.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div2);
    			}

    			destroy_component(herolefttext);

    			destroy_component(heroimg);

    			destroy_component(herorighttext);

    			if (detaching) {
    				detach(t2);
    			}

    			destroy_component(heroarrowdown, detaching);

    			if (detaching) {
    				detach(t3);
    			}

    			destroy_component(herosocial, detaching);
    		}
    	};
    }

    class HeroSection extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$9, safe_not_equal, []);
    	}
    }

    /* src/PageComponents/Home.svelte generated by Svelte v3.7.1 */

    const file$a = "src/PageComponents/Home.svelte";

    function create_fragment$a(ctx) {
    	var t0, t1, section, current;

    	var stripebackground = new StripeBackground({ $$inline: true });

    	var navcontainer = new NavContainer({ $$inline: true });

    	var herosection = new HeroSection({ $$inline: true });

    	return {
    		c: function create() {
    			stripebackground.$$.fragment.c();
    			t0 = space();
    			navcontainer.$$.fragment.c();
    			t1 = space();
    			section = element("section");
    			herosection.$$.fragment.c();
    			attr(section, "class", "one center-all svelte-5w4q2f");
    			add_location(section, file$a, 16, 0, 388);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			mount_component(stripebackground, target, anchor);
    			insert(target, t0, anchor);
    			mount_component(navcontainer, target, anchor);
    			insert(target, t1, anchor);
    			insert(target, section, anchor);
    			mount_component(herosection, section, null);
    			current = true;
    		},

    		p: noop,

    		i: function intro(local) {
    			if (current) return;
    			transition_in(stripebackground.$$.fragment, local);

    			transition_in(navcontainer.$$.fragment, local);

    			transition_in(herosection.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(stripebackground.$$.fragment, local);
    			transition_out(navcontainer.$$.fragment, local);
    			transition_out(herosection.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(stripebackground, detaching);

    			if (detaching) {
    				detach(t0);
    			}

    			destroy_component(navcontainer, detaching);

    			if (detaching) {
    				detach(t1);
    				detach(section);
    			}

    			destroy_component(herosection);
    		}
    	};
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$a, safe_not_equal, []);
    	}
    }

    /* src/App.svelte generated by Svelte v3.7.1 */

    function create_fragment$b(ctx) {
    	var current;

    	var home = new Home({ $$inline: true });

    	return {
    		c: function create() {
    			home.$$.fragment.c();
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			mount_component(home, target, anchor);
    			current = true;
    		},

    		p: noop,

    		i: function intro(local) {
    			if (current) return;
    			transition_in(home.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(home.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(home, detaching);
    		}
    	};
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$b, safe_not_equal, []);
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle-lib.js.map
