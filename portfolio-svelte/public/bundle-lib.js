
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
    			attr(a, "class", "svelte-687ynx");
    			add_location(a, file, 55, 1, 1168);
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
    			attr(input, "class", "hide-for-medium hamburger-check svelte-638fxh");
    			attr(input, "id", "hamburger");
    			attr(input, "name", "hamburger");
    			attr(input, "type", "checkbox");
    			add_location(input, file$1, 89, 0, 1999);
    			attr(span, "class", "hamburger-lines svelte-638fxh");
    			add_location(span, file$1, 91, 4, 2185);
    			attr(label, "class", "hide-for-medium center-all svelte-638fxh");
    			attr(label, "for", "hamburger");
    			add_location(label, file$1, 90, 0, 2122);
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

    // (114:12) {#each navItems as navItem}
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
    			attr(span, "class", "nav-separator svelte-vzyyj6");
    			add_location(span, file$2, 115, 70, 2529);
    			attr(li, "class", "align-center svelte-vzyyj6");
    			add_location(li, file$2, 114, 16, 2433);
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
    			attr(ul, "class", "svelte-vzyyj6");
    			add_location(ul, file$2, 112, 8, 2372);
    			attr(nav, "class", "svelte-vzyyj6");
    			add_location(nav, file$2, 110, 4, 2332);
    			attr(aside, "class", "svelte-vzyyj6");
    			add_location(aside, file$2, 109, 0, 2320);
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

    /* src/Components/IconComponents/TextUnderline.svelte generated by Svelte v3.7.1 */

    const file$3 = "src/Components/IconComponents/TextUnderline.svelte";

    function create_fragment$3(ctx) {
    	var span, t;

    	return {
    		c: function create() {
    			span = element("span");
    			t = text(ctx.text);
    			attr(span, "class", "svelte-13snyg6");
    			add_location(span, file$3, 41, 0, 740);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, span, anchor);
    			append(span, t);
    		},

    		p: function update(changed, ctx) {
    			if (changed.text) {
    				set_data(t, ctx.text);
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(span);
    			}
    		}
    	};
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { text } = $$props;

    	const writable_props = ['text'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<TextUnderline> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('text' in $$props) $$invalidate('text', text = $$props.text);
    	};

    	return { text };
    }

    class TextUnderline extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, ["text"]);

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.text === undefined && !('text' in props)) {
    			console.warn("<TextUnderline> was created without expected prop 'text'");
    		}
    	}

    	get text() {
    		throw new Error("<TextUnderline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<TextUnderline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/FooterSocial.svelte generated by Svelte v3.7.1 */

    const file$4 = "src/Components/FooterSocial.svelte";

    function create_fragment$4(ctx) {
    	var a, current;

    	var textunderline = new TextUnderline({
    		props: { text: ctx.content },
    		$$inline: true
    	});

    	return {
    		c: function create() {
    			a = element("a");
    			textunderline.$$.fragment.c();
    			attr(a, "href", ctx.url);
    			attr(a, "class", "svelte-96ayr3");
    			add_location(a, file$4, 29, 0, 597);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, a, anchor);
    			mount_component(textunderline, a, null);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var textunderline_changes = {};
    			if (changed.content) textunderline_changes.text = ctx.content;
    			textunderline.$set(textunderline_changes);

    			if (!current || changed.url) {
    				attr(a, "href", ctx.url);
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(textunderline.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(textunderline.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(a);
    			}

    			destroy_component(textunderline);
    		}
    	};
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { url, content } = $$props;

    	const writable_props = ['url', 'content'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<FooterSocial> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('url' in $$props) $$invalidate('url', url = $$props.url);
    		if ('content' in $$props) $$invalidate('content', content = $$props.content);
    	};

    	return { url, content };
    }

    class FooterSocial extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, ["url", "content"]);

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.url === undefined && !('url' in props)) {
    			console.warn("<FooterSocial> was created without expected prop 'url'");
    		}
    		if (ctx.content === undefined && !('content' in props)) {
    			console.warn("<FooterSocial> was created without expected prop 'content'");
    		}
    	}

    	get url() {
    		throw new Error("<FooterSocial>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<FooterSocial>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get content() {
    		throw new Error("<FooterSocial>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set content(value) {
    		throw new Error("<FooterSocial>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/FooterBreadcrumb.svelte generated by Svelte v3.7.1 */

    const file$5 = "src/Components/FooterBreadcrumb.svelte";

    function create_fragment$5(ctx) {
    	var a, current;

    	var textunderline = new TextUnderline({
    		props: { text: ctx.name },
    		$$inline: true
    	});

    	return {
    		c: function create() {
    			a = element("a");
    			textunderline.$$.fragment.c();
    			attr(a, "href", ctx.url);
    			attr(a, "class", "svelte-oo8oyl");
    			add_location(a, file$5, 34, 0, 710);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, a, anchor);
    			mount_component(textunderline, a, null);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var textunderline_changes = {};
    			if (changed.name) textunderline_changes.text = ctx.name;
    			textunderline.$set(textunderline_changes);

    			if (!current || changed.url) {
    				attr(a, "href", ctx.url);
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(textunderline.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(textunderline.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(a);
    			}

    			destroy_component(textunderline);
    		}
    	};
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { url, name } = $$props;

    	const writable_props = ['url', 'name'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<FooterBreadcrumb> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('url' in $$props) $$invalidate('url', url = $$props.url);
    		if ('name' in $$props) $$invalidate('name', name = $$props.name);
    	};

    	return { url, name };
    }

    class FooterBreadcrumb extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, ["url", "name"]);

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.url === undefined && !('url' in props)) {
    			console.warn("<FooterBreadcrumb> was created without expected prop 'url'");
    		}
    		if (ctx.name === undefined && !('name' in props)) {
    			console.warn("<FooterBreadcrumb> was created without expected prop 'name'");
    		}
    	}

    	get url() {
    		throw new Error("<FooterBreadcrumb>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<FooterBreadcrumb>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<FooterBreadcrumb>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<FooterBreadcrumb>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Logo.svelte generated by Svelte v3.7.1 */

    const file$6 = "src/Components/Logo.svelte";

    function create_fragment$6(ctx) {
    	var a, p;

    	return {
    		c: function create() {
    			a = element("a");
    			p = element("p");
    			p.textContent = "JR";
    			add_location(p, file$6, 132, 8, 3172);
    			attr(a, "href", "");
    			attr(a, "class", "scrolled svelte-268tkm");
    			add_location(a, file$6, 126, 3, 2948);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, a, anchor);
    			append(a, p);
    			ctx.a_binding(a);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(a);
    			}

    			ctx.a_binding(null);
    		}
    	};
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let logo;
        // onMount(() => {
        //nav turns sticky above footer - could change state instead
        
        
        onMount(() => {
            logo.classList.remove('scrolled');
            let scrolledCheck = () => {
                let scroll = window.pageYOffset;
                if(scroll > 130){
                    logo.classList.add('scrolled');
                } else {
                    logo.classList.remove('scrolled');
                }
                // shape.style.transform = `rotate(-.${scroll}deg)`
                // console.log(shape)
            };
            window.addEventListener("scroll", scrolledCheck);
            
        });
    // })

    	function a_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			$$invalidate('logo', logo = $$value);
    		});
    	}

    	return { logo, a_binding };
    }

    class Logo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, []);
    	}
    }

    /* src/Components/FooterContainer.svelte generated by Svelte v3.7.1 */

    const file$7 = "src/Components/FooterContainer.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.socialCta = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.breadcrumb = list[i];
    	return child_ctx;
    }

    // (112:12) {#each breadcrumbs as breadcrumb}
    function create_each_block_1(ctx) {
    	var current;

    	var footerbreadcrumb = new FooterBreadcrumb({
    		props: { name: ctx.breadcrumb.name, url: ctx.breadcrumb.url },
    		$$inline: true
    	});

    	return {
    		c: function create() {
    			footerbreadcrumb.$$.fragment.c();
    		},

    		m: function mount(target, anchor) {
    			mount_component(footerbreadcrumb, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var footerbreadcrumb_changes = {};
    			if (changed.breadcrumbs) footerbreadcrumb_changes.name = ctx.breadcrumb.name;
    			if (changed.breadcrumbs) footerbreadcrumb_changes.url = ctx.breadcrumb.url;
    			footerbreadcrumb.$set(footerbreadcrumb_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(footerbreadcrumb.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(footerbreadcrumb.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(footerbreadcrumb, detaching);
    		}
    	};
    }

    // (118:12) {#each socialCtas as socialCta}
    function create_each_block$1(ctx) {
    	var current;

    	var footersocial = new FooterSocial({
    		props: {
    		content: ctx.socialCta.content,
    		url: ctx.socialCta.url
    	},
    		$$inline: true
    	});

    	return {
    		c: function create() {
    			footersocial.$$.fragment.c();
    		},

    		m: function mount(target, anchor) {
    			mount_component(footersocial, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var footersocial_changes = {};
    			if (changed.socialCtas) footersocial_changes.content = ctx.socialCta.content;
    			if (changed.socialCtas) footersocial_changes.url = ctx.socialCta.url;
    			footersocial.$set(footersocial_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(footersocial.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(footersocial.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(footersocial, detaching);
    		}
    	};
    }

    function create_fragment$7(ctx) {
    	var footer_1, div2, div0, h20, t1, t2, div1, h21, t4, t5, div3, p0, t7, p1, current;

    	var each_value_1 = ctx.breadcrumbs;

    	var each_blocks_1 = [];

    	for (var i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks_1[i], 1, 1, () => {
    		each_blocks_1[i] = null;
    	});

    	var each_value = ctx.socialCtas;

    	var each_blocks = [];

    	for (var i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out_1 = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	return {
    		c: function create() {
    			footer_1 = element("footer");
    			div2 = element("div");
    			div0 = element("div");
    			h20 = element("h2");
    			h20.textContent = "Info";
    			t1 = space();

    			for (var i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t2 = space();
    			div1 = element("div");
    			h21 = element("h2");
    			h21.textContent = "Connect";
    			t4 = space();

    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t5 = space();
    			div3 = element("div");
    			p0 = element("p");
    			p0.textContent = "@ Joshua Roper 2019";
    			t7 = space();
    			p1 = element("p");
    			p1.textContent = "Innovative | Bold | Creative";
    			attr(h20, "class", "svelte-d9fi3i");
    			add_location(h20, file$7, 110, 12, 2482);
    			attr(div0, "class", "breadcrumb svelte-d9fi3i");
    			add_location(div0, file$7, 109, 8, 2445);
    			attr(h21, "class", "svelte-d9fi3i");
    			add_location(h21, file$7, 116, 12, 2695);
    			attr(div1, "class", "cta svelte-d9fi3i");
    			add_location(div1, file$7, 115, 8, 2665);
    			attr(div2, "class", "top-row svelte-d9fi3i");
    			add_location(div2, file$7, 108, 4, 2415);
    			attr(p0, "class", "svelte-d9fi3i");
    			add_location(p0, file$7, 126, 8, 2995);
    			attr(p1, "class", "svelte-d9fi3i");
    			add_location(p1, file$7, 127, 8, 3030);
    			attr(div3, "class", "copyright svelte-d9fi3i");
    			add_location(div3, file$7, 125, 4, 2963);
    			attr(footer_1, "class", "svelte-d9fi3i");
    			add_location(footer_1, file$7, 107, 0, 2383);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, footer_1, anchor);
    			append(footer_1, div2);
    			append(div2, div0);
    			append(div0, h20);
    			append(div0, t1);

    			for (var i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div0, null);
    			}

    			append(div2, t2);
    			append(div2, div1);
    			append(div1, h21);
    			append(div1, t4);

    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			append(footer_1, t5);
    			append(footer_1, div3);
    			append(div3, p0);
    			append(div3, t7);
    			append(div3, p1);
    			ctx.footer_1_binding(footer_1);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (changed.breadcrumbs) {
    				each_value_1 = ctx.breadcrumbs;

    				for (var i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(changed, child_ctx);
    						transition_in(each_blocks_1[i], 1);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						transition_in(each_blocks_1[i], 1);
    						each_blocks_1[i].m(div0, null);
    					}
    				}

    				group_outros();
    				for (i = each_value_1.length; i < each_blocks_1.length; i += 1) out(i);
    				check_outros();
    			}

    			if (changed.socialCtas) {
    				each_value = ctx.socialCtas;

    				for (var i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div1, null);
    					}
    				}

    				group_outros();
    				for (i = each_value.length; i < each_blocks.length; i += 1) out_1(i);
    				check_outros();
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			for (var i = 0; i < each_value_1.length; i += 1) transition_in(each_blocks_1[i]);

    			for (var i = 0; i < each_value.length; i += 1) transition_in(each_blocks[i]);

    			current = true;
    		},

    		o: function outro(local) {
    			each_blocks_1 = each_blocks_1.filter(Boolean);
    			for (let i = 0; i < each_blocks_1.length; i += 1) transition_out(each_blocks_1[i]);

    			each_blocks = each_blocks.filter(Boolean);
    			for (let i = 0; i < each_blocks.length; i += 1) transition_out(each_blocks[i]);

    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(footer_1);
    			}

    			destroy_each(each_blocks_1, detaching);

    			destroy_each(each_blocks, detaching);

    			ctx.footer_1_binding(null);
    		}
    	};
    }

    function instance$7($$self, $$props, $$invalidate) {
    	
    let breadcrumbs = [
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

    let socialCtas = [
        {
            content: 'Connect with me on LinkedIn',
            url: ''
        },
        {
            content: 'Follow me on GitHub',
            url: ''
        }
    ];

    let footer;

    onMount(() => {
        //nav turns sticky above footer - could change state instead
        let nav = document.getElementsByTagName('aside');
        
        window.addEventListener("scroll", () => {
            let footerTopScrollPos = footer.offsetTop - footer.offsetHeight;
            let footerHeight = footer.offsetHeight;
            let footerScrollMatch = window.pageYOffset + window.innerHeight - footerHeight;
            let stickyMarginCalc = document.body.offsetHeight - (window.pageYOffset + window.innerHeight + footerHeight);
            let stickyMarginAbs = Math.abs(stickyMarginCalc);


            if(footerScrollMatch >= footerTopScrollPos){
                nav[0].style.marginBottom = `${stickyMarginAbs}px`;
            } else {
                nav[0].style.marginBottom = '0px';
            }
        });
    });

    	function footer_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			$$invalidate('footer', footer = $$value);
    		});
    	}

    	return {
    		breadcrumbs,
    		socialCtas,
    		footer,
    		footer_1_binding
    	};
    }

    class FooterContainer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, []);
    	}
    }

    /* src/Components/HeroTopText.svelte generated by Svelte v3.7.1 */

    const file$8 = "src/Components/HeroTopText.svelte";

    function create_fragment$8(ctx) {
    	var div, h1, t1, h2, t3, h3;

    	return {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Joshua Roper";
    			t1 = space();
    			h2 = element("h2");
    			h2.textContent = "Front End Developer";
    			t3 = space();
    			h3 = element("h3");
    			h3.textContent = "& Designer";
    			attr(h1, "class", "svelte-1h1hme1");
    			add_location(h1, file$8, 31, 4, 394);
    			attr(h2, "class", "svelte-1h1hme1");
    			add_location(h2, file$8, 32, 4, 420);
    			attr(h3, "class", "svelte-1h1hme1");
    			add_location(h3, file$8, 33, 4, 453);
    			attr(div, "class", "svelte-1h1hme1");
    			add_location(div, file$8, 30, 0, 384);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div, anchor);
    			append(div, h1);
    			append(div, t1);
    			append(div, h2);
    			append(div, t3);
    			append(div, h3);
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

    class HeroTopText extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$8, safe_not_equal, []);
    	}
    }

    /* src/Components/IconComponents/ImageGradient.svelte generated by Svelte v3.7.1 */

    const file$9 = "src/Components/IconComponents/ImageGradient.svelte";

    function create_fragment$9(ctx) {
    	var span0, t, span1;

    	return {
    		c: function create() {
    			span0 = element("span");
    			t = space();
    			span1 = element("span");
    			attr(span0, "class", "boxes svelte-vded6b");
    			add_location(span0, file$9, 111, 1, 2017);
    			attr(span1, "class", "gradient-animate svelte-vded6b");
    			add_location(span1, file$9, 112, 1, 2046);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, span0, anchor);
    			insert(target, t, anchor);
    			insert(target, span1, anchor);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(span0);
    				detach(t);
    				detach(span1);
    			}
    		}
    	};
    }

    class ImageGradient extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$9, safe_not_equal, []);
    	}
    }

    /* src/Components/HeroImg.svelte generated by Svelte v3.7.1 */

    const file$a = "src/Components/HeroImg.svelte";

    function create_fragment$a(ctx) {
    	var div, current;

    	var imagegradient = new ImageGradient({ $$inline: true });

    	return {
    		c: function create() {
    			div = element("div");
    			imagegradient.$$.fragment.c();
    			attr(div, "class", "hero-image svelte-1hm44tf");
    			add_location(div, file$a, 58, 0, 1204);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div, anchor);
    			mount_component(imagegradient, div, null);
    			ctx.div_binding(div);
    			current = true;
    		},

    		p: noop,

    		i: function intro(local) {
    			if (current) return;
    			transition_in(imagegradient.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(imagegradient.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div);
    			}

    			destroy_component(imagegradient);

    			ctx.div_binding(null);
    		}
    	};
    }

    function instance$8($$self, $$props, $$invalidate) {
    	
    let heroImg;
    // onMount(()=>{

    //     window.addEventListener('scroll', ()=>{

    //         let scrollHeight = window.pageYOffset;
            
    //         heroImg.style.top = `-${scrollHeight / 20}px`

    //     })

    // })

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			$$invalidate('heroImg', heroImg = $$value);
    		});
    	}

    	return { heroImg, div_binding };
    }

    class HeroImg extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$a, safe_not_equal, []);
    	}
    }

    /* src/Components/HeroSocial.svelte generated by Svelte v3.7.1 */

    const file$b = "src/Components/HeroSocial.svelte";

    function create_fragment$b(ctx) {
    	var div, i0, t0, i1, t1, i2;

    	return {
    		c: function create() {
    			div = element("div");
    			i0 = element("i");
    			t0 = space();
    			i1 = element("i");
    			t1 = space();
    			i2 = element("i");
    			attr(i0, "class", "fab fa-github svelte-1mbdc0i");
    			add_location(i0, file$b, 53, 4, 989);
    			attr(i1, "class", "fab fa-linkedin svelte-1mbdc0i");
    			add_location(i1, file$b, 54, 4, 1023);
    			attr(i2, "class", "fas fa-envelope svelte-1mbdc0i");
    			add_location(i2, file$b, 55, 4, 1059);
    			attr(div, "class", "social-container svelte-1mbdc0i");
    			add_location(div, file$b, 52, 0, 954);
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
    		init(this, options, null, create_fragment$b, safe_not_equal, []);
    	}
    }

    /* src/Components/HeroSection.svelte generated by Svelte v3.7.1 */

    const file$c = "src/Components/HeroSection.svelte";

    function create_fragment$c(ctx) {
    	var div1, div0, t0, t1, current;

    	var herosocial = new HeroSocial({ $$inline: true });

    	var herotoptext = new HeroTopText({ $$inline: true });

    	var heroimg = new HeroImg({ $$inline: true });

    	return {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			herosocial.$$.fragment.c();
    			t0 = space();
    			herotoptext.$$.fragment.c();
    			t1 = space();
    			heroimg.$$.fragment.c();
    			attr(div0, "class", "hero-cta svelte-12942m6");
    			add_location(div0, file$c, 33, 4, 745);
    			attr(div1, "class", "hero-container center-all svelte-12942m6");
    			add_location(div1, file$c, 32, 0, 701);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div1, anchor);
    			append(div1, div0);
    			mount_component(herosocial, div0, null);
    			append(div0, t0);
    			mount_component(herotoptext, div0, null);
    			append(div1, t1);
    			mount_component(heroimg, div1, null);
    			current = true;
    		},

    		p: noop,

    		i: function intro(local) {
    			if (current) return;
    			transition_in(herosocial.$$.fragment, local);

    			transition_in(herotoptext.$$.fragment, local);

    			transition_in(heroimg.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(herosocial.$$.fragment, local);
    			transition_out(herotoptext.$$.fragment, local);
    			transition_out(heroimg.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div1);
    			}

    			destroy_component(herosocial);

    			destroy_component(herotoptext);

    			destroy_component(heroimg);
    		}
    	};
    }

    class HeroSection extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$c, safe_not_equal, []);
    	}
    }

    /* src/Components/IconComponents/CircleIcon.svelte generated by Svelte v3.7.1 */

    const file$d = "src/Components/IconComponents/CircleIcon.svelte";

    function create_fragment$d(ctx) {
    	var span;

    	return {
    		c: function create() {
    			span = element("span");
    			attr(span, "class", "circleIcon svelte-1lt09bf");
    			add_location(span, file$d, 38, 0, 711);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, span, anchor);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(span);
    			}
    		}
    	};
    }

    class CircleIcon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$d, safe_not_equal, []);
    	}
    }

    /* src/Components/SingleProjectText.svelte generated by Svelte v3.7.1 */

    const file$e = "src/Components/SingleProjectText.svelte";

    function create_fragment$e(ctx) {
    	var div, h2, t1, h3, t3, p, t5, a, current;

    	var circleicon = new CircleIcon({ $$inline: true });

    	var textunderline = new TextUnderline({
    		props: { text: 'Projects' },
    		$$inline: true
    	});

    	return {
    		c: function create() {
    			div = element("div");
    			h2 = element("h2");
    			h2.textContent = "My Projects";
    			t1 = space();
    			h3 = element("h3");
    			h3.textContent = "Innovative | Bold | Creative";
    			t3 = space();
    			p = element("p");
    			p.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. \n        Possimus, totam quos pariatur accusamus quisquam veniam! Dolor ullam quae praesentium suscipit molestiae \n        cumque temporibus eum";
    			t5 = space();
    			a = element("a");
    			circleicon.$$.fragment.c();
    			textunderline.$$.fragment.c();
    			attr(h2, "class", "svelte-9rdgtd");
    			add_location(h2, file$e, 37, 4, 613);
    			attr(h3, "class", "svelte-9rdgtd");
    			add_location(h3, file$e, 38, 4, 638);
    			attr(p, "class", "svelte-9rdgtd");
    			add_location(p, file$e, 39, 4, 680);
    			attr(a, "href", "");
    			attr(a, "class", "svelte-9rdgtd");
    			add_location(a, file$e, 44, 4, 907);
    			add_location(div, file$e, 36, 0, 603);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div, anchor);
    			append(div, h2);
    			append(div, t1);
    			append(div, h3);
    			append(div, t3);
    			append(div, p);
    			append(div, t5);
    			append(div, a);
    			mount_component(circleicon, a, null);
    			mount_component(textunderline, a, null);
    			current = true;
    		},

    		p: noop,

    		i: function intro(local) {
    			if (current) return;
    			transition_in(circleicon.$$.fragment, local);

    			transition_in(textunderline.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(circleicon.$$.fragment, local);
    			transition_out(textunderline.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div);
    			}

    			destroy_component(circleicon);

    			destroy_component(textunderline);
    		}
    	};
    }

    class SingleProjectText extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$e, safe_not_equal, []);
    	}
    }

    /* src/Components/SingleProjectImage.svelte generated by Svelte v3.7.1 */

    const file$f = "src/Components/SingleProjectImage.svelte";

    function create_fragment$f(ctx) {
    	var img;

    	return {
    		c: function create() {
    			img = element("img");
    			attr(img, "src", "images/homePage/creativeShiz.png");
    			attr(img, "alt", "");
    			attr(img, "class", "svelte-16kexi5");
    			add_location(img, file$f, 19, 0, 254);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, img, anchor);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(img);
    			}
    		}
    	};
    }

    class SingleProjectImage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$f, safe_not_equal, []);
    	}
    }

    /* src/Components/SingleProjectSection.svelte generated by Svelte v3.7.1 */

    const file$g = "src/Components/SingleProjectSection.svelte";

    function create_fragment$g(ctx) {
    	var div2, div0, t, div1, current;

    	var singleprojecttext = new SingleProjectText({ $$inline: true });

    	var singleprojectimage = new SingleProjectImage({ $$inline: true });

    	return {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			singleprojecttext.$$.fragment.c();
    			t = space();
    			div1 = element("div");
    			singleprojectimage.$$.fragment.c();
    			attr(div0, "class", "project-text svelte-1qgam1a");
    			add_location(div0, file$g, 22, 4, 468);
    			attr(div1, "class", "project-image svelte-1qgam1a");
    			add_location(div1, file$g, 25, 4, 540);
    			attr(div2, "class", "container svelte-1qgam1a");
    			add_location(div2, file$g, 21, 0, 439);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div2, anchor);
    			append(div2, div0);
    			mount_component(singleprojecttext, div0, null);
    			append(div2, t);
    			append(div2, div1);
    			mount_component(singleprojectimage, div1, null);
    			current = true;
    		},

    		p: noop,

    		i: function intro(local) {
    			if (current) return;
    			transition_in(singleprojecttext.$$.fragment, local);

    			transition_in(singleprojectimage.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(singleprojecttext.$$.fragment, local);
    			transition_out(singleprojectimage.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div2);
    			}

    			destroy_component(singleprojecttext);

    			destroy_component(singleprojectimage);
    		}
    	};
    }

    class SingleProjectSection extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$g, safe_not_equal, []);
    	}
    }

    /* src/Components/MultiProjectCard.svelte generated by Svelte v3.7.1 */

    const file$h = "src/Components/MultiProjectCard.svelte";

    function create_fragment$h(ctx) {
    	var a, div, img, t0, p, span, t1;

    	return {
    		c: function create() {
    			a = element("a");
    			div = element("div");
    			img = element("img");
    			t0 = space();
    			p = element("p");
    			span = element("span");
    			t1 = text(ctx.projectName);
    			attr(img, "src", ctx.imgSrc);
    			attr(img, "alt", "");
    			attr(img, "class", "svelte-1l0e3r7");
    			add_location(img, file$h, 69, 6, 1372);
    			attr(div, "class", "img-container svelte-1l0e3r7");
    			add_location(div, file$h, 68, 4, 1338);
    			attr(span, "class", "animateSick");
    			add_location(span, file$h, 71, 7, 1418);
    			attr(p, "class", "svelte-1l0e3r7");
    			add_location(p, file$h, 71, 4, 1415);
    			attr(a, "class", "svelte-1l0e3r7");
    			add_location(a, file$h, 67, 0, 1330);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, a, anchor);
    			append(a, div);
    			append(div, img);
    			append(a, t0);
    			append(a, p);
    			append(p, span);
    			append(p, t1);
    		},

    		p: function update(changed, ctx) {
    			if (changed.imgSrc) {
    				attr(img, "src", ctx.imgSrc);
    			}

    			if (changed.projectName) {
    				set_data(t1, ctx.projectName);
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

    function instance$9($$self, $$props, $$invalidate) {
    	let { imgSrc, projectName } = $$props;

    	const writable_props = ['imgSrc', 'projectName'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<MultiProjectCard> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('imgSrc' in $$props) $$invalidate('imgSrc', imgSrc = $$props.imgSrc);
    		if ('projectName' in $$props) $$invalidate('projectName', projectName = $$props.projectName);
    	};

    	return { imgSrc, projectName };
    }

    class MultiProjectCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$h, safe_not_equal, ["imgSrc", "projectName"]);

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.imgSrc === undefined && !('imgSrc' in props)) {
    			console.warn("<MultiProjectCard> was created without expected prop 'imgSrc'");
    		}
    		if (ctx.projectName === undefined && !('projectName' in props)) {
    			console.warn("<MultiProjectCard> was created without expected prop 'projectName'");
    		}
    	}

    	get imgSrc() {
    		throw new Error("<MultiProjectCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set imgSrc(value) {
    		throw new Error("<MultiProjectCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get projectName() {
    		throw new Error("<MultiProjectCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set projectName(value) {
    		throw new Error("<MultiProjectCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/MultiProjectSection.svelte generated by Svelte v3.7.1 */

    const file$i = "src/Components/MultiProjectSection.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.project = list[i];
    	return child_ctx;
    }

    // (68:8) {#each projects as project}
    function create_each_block$2(ctx) {
    	var current;

    	var multiprojectcard = new MultiProjectCard({
    		props: {
    		imgSrc: ctx.project.imgSrc,
    		projectName: ctx.project.projectName
    	},
    		$$inline: true
    	});

    	return {
    		c: function create() {
    			multiprojectcard.$$.fragment.c();
    		},

    		m: function mount(target, anchor) {
    			mount_component(multiprojectcard, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var multiprojectcard_changes = {};
    			if (changed.projects) multiprojectcard_changes.imgSrc = ctx.project.imgSrc;
    			if (changed.projects) multiprojectcard_changes.projectName = ctx.project.projectName;
    			multiprojectcard.$set(multiprojectcard_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(multiprojectcard.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(multiprojectcard.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(multiprojectcard, detaching);
    		}
    	};
    }

    function create_fragment$i(ctx) {
    	var div1, h2, t1, div0, t2, a, t3, current;

    	var each_value = ctx.projects;

    	var each_blocks = [];

    	for (var i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	var circleicon = new CircleIcon({ $$inline: true });

    	var textunderline = new TextUnderline({
    		props: { text: 'explore more works' },
    		$$inline: true
    	});

    	return {
    		c: function create() {
    			div1 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Recent Works";
    			t1 = space();
    			div0 = element("div");

    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			a = element("a");
    			circleicon.$$.fragment.c();
    			t3 = space();
    			textunderline.$$.fragment.c();
    			attr(h2, "class", "svelte-1k5cxrh");
    			add_location(h2, file$i, 63, 3, 1283);
    			attr(div0, "class", "card-container center-all svelte-1k5cxrh");
    			add_location(div0, file$i, 65, 4, 1314);
    			attr(a, "href", "");
    			attr(a, "class", "svelte-1k5cxrh");
    			add_location(a, file$i, 71, 4, 1517);
    			attr(div1, "class", "svelte-1k5cxrh");
    			add_location(div1, file$i, 62, 0, 1274);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div1, anchor);
    			append(div1, h2);
    			append(div1, t1);
    			append(div1, div0);

    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append(div1, t2);
    			append(div1, a);
    			mount_component(circleicon, a, null);
    			append(a, t3);
    			mount_component(textunderline, a, null);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (changed.projects) {
    				each_value = ctx.projects;

    				for (var i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div0, null);
    					}
    				}

    				group_outros();
    				for (i = each_value.length; i < each_blocks.length; i += 1) out(i);
    				check_outros();
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			for (var i = 0; i < each_value.length; i += 1) transition_in(each_blocks[i]);

    			transition_in(circleicon.$$.fragment, local);

    			transition_in(textunderline.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);
    			for (let i = 0; i < each_blocks.length; i += 1) transition_out(each_blocks[i]);

    			transition_out(circleicon.$$.fragment, local);
    			transition_out(textunderline.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div1);
    			}

    			destroy_each(each_blocks, detaching);

    			destroy_component(circleicon);

    			destroy_component(textunderline);
    		}
    	};
    }

    function instance$a($$self) {
    	

    let projects = [
        {
            imgSrc: 'images/homePage/university-park-cta.jpeg',
            projectName: 'University Park'
        },
        {
            imgSrc: 'images/homePage/bub.jpeg',
            projectName: 'Creative Revolt'
        },
        {
            imgSrc: 'images/homePage/WBUH.jpeg',
            projectName: 'HomeVestors'
        }
    ];

    	return { projects };
    }

    class MultiProjectSection extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$i, safe_not_equal, []);
    	}
    }

    /* src/PageComponents/Home.svelte generated by Svelte v3.7.1 */

    const file$j = "src/PageComponents/Home.svelte";

    function create_fragment$j(ctx) {
    	var t0, t1, section0, t2, section1, t3, section2, t4, current;

    	var logo = new Logo({ $$inline: true });

    	var navcontainer = new NavContainer({ $$inline: true });

    	var herosection = new HeroSection({ $$inline: true });

    	var singleprojectsection = new SingleProjectSection({ $$inline: true });

    	var multiprojectsection = new MultiProjectSection({ $$inline: true });

    	var footercontainer = new FooterContainer({ $$inline: true });

    	return {
    		c: function create() {
    			logo.$$.fragment.c();
    			t0 = space();
    			navcontainer.$$.fragment.c();
    			t1 = space();
    			section0 = element("section");
    			herosection.$$.fragment.c();
    			t2 = space();
    			section1 = element("section");
    			singleprojectsection.$$.fragment.c();
    			t3 = space();
    			section2 = element("section");
    			multiprojectsection.$$.fragment.c();
    			t4 = space();
    			footercontainer.$$.fragment.c();
    			attr(section0, "class", "one center-all svelte-creegf");
    			add_location(section0, file$j, 72, 0, 1826);
    			attr(section1, "class", "two center-all svelte-creegf");
    			add_location(section1, file$j, 75, 0, 1890);
    			attr(section2, "class", "three center-all svelte-creegf");
    			add_location(section2, file$j, 78, 0, 1963);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			mount_component(logo, target, anchor);
    			insert(target, t0, anchor);
    			mount_component(navcontainer, target, anchor);
    			insert(target, t1, anchor);
    			insert(target, section0, anchor);
    			mount_component(herosection, section0, null);
    			insert(target, t2, anchor);
    			insert(target, section1, anchor);
    			mount_component(singleprojectsection, section1, null);
    			insert(target, t3, anchor);
    			insert(target, section2, anchor);
    			mount_component(multiprojectsection, section2, null);
    			insert(target, t4, anchor);
    			mount_component(footercontainer, target, anchor);
    			current = true;
    		},

    		p: noop,

    		i: function intro(local) {
    			if (current) return;
    			transition_in(logo.$$.fragment, local);

    			transition_in(navcontainer.$$.fragment, local);

    			transition_in(herosection.$$.fragment, local);

    			transition_in(singleprojectsection.$$.fragment, local);

    			transition_in(multiprojectsection.$$.fragment, local);

    			transition_in(footercontainer.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(logo.$$.fragment, local);
    			transition_out(navcontainer.$$.fragment, local);
    			transition_out(herosection.$$.fragment, local);
    			transition_out(singleprojectsection.$$.fragment, local);
    			transition_out(multiprojectsection.$$.fragment, local);
    			transition_out(footercontainer.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(logo, detaching);

    			if (detaching) {
    				detach(t0);
    			}

    			destroy_component(navcontainer, detaching);

    			if (detaching) {
    				detach(t1);
    				detach(section0);
    			}

    			destroy_component(herosection);

    			if (detaching) {
    				detach(t2);
    				detach(section1);
    			}

    			destroy_component(singleprojectsection);

    			if (detaching) {
    				detach(t3);
    				detach(section2);
    			}

    			destroy_component(multiprojectsection);

    			if (detaching) {
    				detach(t4);
    			}

    			destroy_component(footercontainer, detaching);
    		}
    	};
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$j, safe_not_equal, []);
    	}
    }

    /* src/App.svelte generated by Svelte v3.7.1 */

    function create_fragment$k(ctx) {
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
    		init(this, options, null, create_fragment$k, safe_not_equal, []);
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
