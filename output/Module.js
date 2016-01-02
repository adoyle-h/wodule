Ext.data.JsonP.Module({"tagname":"class","name":"Module","autodetected":{},"files":[{"filename":"wodule.js","href":null}],"members":[{"name":"initialized","tagname":"property","owner":"Module","id":"property-initialized","meta":{}},{"name":"running","tagname":"property","owner":"Module","id":"property-running","meta":{}},{"name":"constructor","tagname":"method","owner":"Module","id":"method-constructor","meta":{}},{"name":"_exit","tagname":"method","owner":"Module","id":"method-_exit","meta":{"protected":true,"template":true}},{"name":"_init","tagname":"method","owner":"Module","id":"method-_init","meta":{"protected":true,"template":true}},{"name":"_start","tagname":"method","owner":"Module","id":"method-_start","meta":{"protected":true,"template":true}},{"name":"_stop","tagname":"method","owner":"Module","id":"method-_stop","meta":{"protected":true,"template":true}},{"name":"exit","tagname":"method","owner":"Module","id":"method-exit","meta":{}},{"name":"init","tagname":"method","owner":"Module","id":"method-init","meta":{}},{"name":"start","tagname":"method","owner":"Module","id":"method-start","meta":{}},{"name":"stop","tagname":"method","owner":"Module","id":"method-stop","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-Module","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><div class='doc-contents'>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-initialized' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Module'>Module</span><br/></div><a href='#!/api/Module-property-initialized' class='name expandable'>initialized</a> : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Whether the module is initialized. ...</div><div class='long'><p>Whether the module is initialized.</p>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-running' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Module'>Module</span><br/></div><a href='#!/api/Module-property-running' class='name expandable'>running</a> : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Whether the module is running. ...</div><div class='long'><p>Whether the module is running.</p>\n<p>Defaults to: <code>false</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Module'>Module</span><br/></div><strong class='new-keyword'>new</strong><a href='#!/api/Module-method-constructor' class='name expandable'>Module</a>( <span class='pre'>[options]</span> ) : <a href=\"#!/api/Module\" rel=\"Module\" class=\"docClass\">Module</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>options</span> : Object (optional)<div class='sub-desc'>\n<ul><li><span class='pre'>init</span> : Function (optional)<div class='sub-desc'>\n<p>Defaults to: <code>idle</code></p></div></li><li><span class='pre'>start</span> : Function (optional)<div class='sub-desc'>\n<p>Defaults to: <code>promiseTrue</code></p></div></li><li><span class='pre'>stop</span> : Function (optional)<div class='sub-desc'>\n<p>Defaults to: <code>promiseTrue</code></p></div></li><li><span class='pre'>exit</span> : Function (optional)<div class='sub-desc'>\n<p>Defaults to: <code>idle</code></p></div></li></ul></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Module\" rel=\"Module\" class=\"docClass\">Module</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_exit' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Module'>Module</span><br/></div><a href='#!/api/Module-method-_exit' class='name expandable'>_exit</a>( <span class='pre'></span> ) : *<span class=\"signature\"><span class='protected' >protected</span><span class='template' >template</span></span></div><div class='description'><div class='short'>Implement your business codes to prepare for exiting process. ...</div><div class='long'><p>Implement your business codes to prepare for exiting process.</p>\n\n<p>Do not do anything asynchronous.\nIt is better to catch any exception in the function by yourself.</p>\n      <div class='rounded-box template-box'>\n      <p>This is a <a href=\"#!/guide/components\">template method</a>.\n         a hook into the functionality of this class.\n         Feel free to override it in child classes.</p>\n      </div>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>*</span><div class='sub-desc'><p>The returned value does not work.</p>\n</div></li></ul><h3 class='pa'>Throws</h3><ul><li><span class='pre'>*</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_init' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Module'>Module</span><br/></div><a href='#!/api/Module-method-_init' class='name expandable'>_init</a>( <span class='pre'></span> ) : *|false<span class=\"signature\"><span class='protected' >protected</span><span class='template' >template</span></span></div><div class='description'><div class='short'>Implement your business codes to initialize this module. ...</div><div class='long'><p>Implement your business codes to initialize this module.\nDo not do anything asynchronous.</p>\n      <div class='rounded-box template-box'>\n      <p>This is a <a href=\"#!/guide/components\">template method</a>.\n         a hook into the functionality of this class.\n         Feel free to override it in child classes.</p>\n      </div>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>*|false</span><div class='sub-desc'><p>Return anything expect <code>false</code> to represent the module has been initialized successfully, and <code>module.initialized</code> will be <code>true</code>.\nReturning <code>false</code> means that the process of initializing module failed.</p>\n</div></li></ul><h3 class='pa'>Throws</h3><ul><li><span class='pre'>Error</span><div class='sub-desc'><p>Throw an error if any exception occurs.</p>\n</div></li></ul></div></div></div><div id='method-_start' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Module'>Module</span><br/></div><a href='#!/api/Module-method-_start' class='name expandable'>_start</a>( <span class='pre'>done</span> ) : Promise.&lt;*|Error&gt;<span class=\"signature\"><span class='protected' >protected</span><span class='template' >template</span></span></div><div class='description'><div class='short'>Implement your business codes to start this module. ...</div><div class='long'><p>Implement your business codes to start this module.</p>\n\n<p>You must invoke the <code>done</code> function or return promise to indicate the process of starting module has been done.</p>\n      <div class='rounded-box template-box'>\n      <p>This is a <a href=\"#!/guide/components\">template method</a>.\n         a hook into the functionality of this class.\n         Feel free to override it in child classes.</p>\n      </div>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>done</span> : Function<div class='sub-desc'><p>A optional callback for indicating the process has been done.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>err</span> : Error (optional)<div class='sub-desc'><p>If pass an error, it means that the process of starting module failed.</p>\n</div></li></ul></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Promise.&lt;*|Error&gt;</span><div class='sub-desc'><p>Return a promise fulfilled with anything to represent the module has been started successfully, and <code>module.running</code> will be <code>true</code>.\nReturning a promise rejected with a error means that the process of starting module failed.</p>\n</div></li></ul><h3 class='pa'>Throws</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>Throw an error if any exception occurs.</p>\n</div></li></ul></div></div></div><div id='method-_stop' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Module'>Module</span><br/></div><a href='#!/api/Module-method-_stop' class='name expandable'>_stop</a>( <span class='pre'>done</span> ) : Promise.&lt;*|Error&gt;<span class=\"signature\"><span class='protected' >protected</span><span class='template' >template</span></span></div><div class='description'><div class='short'>Implement your business codes to stop this module. ...</div><div class='long'><p>Implement your business codes to stop this module.</p>\n\n<p>You must invoke the <code>done</code> function or return promise to indicate the process of stopping module has been done.</p>\n      <div class='rounded-box template-box'>\n      <p>This is a <a href=\"#!/guide/components\">template method</a>.\n         a hook into the functionality of this class.\n         Feel free to override it in child classes.</p>\n      </div>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>done</span> : Function<div class='sub-desc'><p>A optional callback for indicating the process has been done.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>err</span> : Error (optional)<div class='sub-desc'><p>If pass an error, it means that the process of stopping module failed.</p>\n</div></li></ul></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Promise.&lt;*|Error&gt;</span><div class='sub-desc'><p>Return a promise fulfilled with anything to represent the module is stopped successfully, and <code>module.running</code> will be false.\nReturning a promise rejected with a error means that the process of stopping module failed.</p>\n</div></li></ul><h3 class='pa'>Throws</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>Throw an error if any exception occurs.</p>\n</div></li></ul></div></div></div><div id='method-exit' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Module'>Module</span><br/></div><a href='#!/api/Module-method-exit' class='name expandable'>exit</a>( <span class='pre'>exitCode</span> ) : undefined<span class=\"signature\"></span></div><div class='description'><div class='short'>Stop the module first, and then invoke module._exit. ...</div><div class='long'><p>Stop the module first, and then invoke <code>module._exit</code>. Exit process finally.\nIt will only be executed once even if with multiple invocations.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>exitCode</span> : Number<div class='sub-desc'><p>The UNIX exit code</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>undefined</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-init' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Module'>Module</span><br/></div><a href='#!/api/Module-method-init' class='name expandable'>init</a>( <span class='pre'></span> ) : true<span class=\"signature\"></span></div><div class='description'><div class='short'>Initialize the module. ...</div><div class='long'><p>Initialize the module.\nIt is only initialized once even if multiple invocations.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>true</span><div class='sub-desc'><p>The module has been initialized successfully.</p>\n</div></li></ul><h3 class='pa'>Throws</h3><ul><li><span class='pre'>Error</span><div class='sub-desc'><p>Throw an exception when failed to initialize.</p>\n</div></li></ul></div></div></div><div id='method-start' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Module'>Module</span><br/></div><a href='#!/api/Module-method-start' class='name expandable'>start</a>( <span class='pre'>[callback]</span> ) : Promise.&lt;true|Error&gt;<span class=\"signature\"></span></div><div class='description'><div class='short'>initialize and start\n\nThis method return a promise indicating whether started successfully or not. ...</div><div class='long'><p>initialize and start</p>\n\n<p>This method return a promise indicating whether started successfully or not.\nWhen any error occurs in this period, the callback(err) will be invoked first (if callback is provided),\nand then the promise will be rejected with an error.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>callback</span> : Function (optional)<div class='sub-desc'><p>The callback will be invoked when start function is done.</p>\n<p>Defaults to: <code>undefined</code></p><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>err</span> : Error (optional)<div class='sub-desc'><p>The error exists when failed to start module.</p>\n</div></li></ul></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Promise.&lt;true|Error&gt;</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-stop' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Module'>Module</span><br/></div><a href='#!/api/Module-method-stop' class='name expandable'>stop</a>( <span class='pre'>[callback]</span> ) : Promise.&lt;true|Error&gt;<span class=\"signature\"></span></div><div class='description'><div class='short'>stop running module\n\nThis method return a promise indicating whether stopped successfully or not. ...</div><div class='long'><p>stop running module</p>\n\n<p>This method return a promise indicating whether stopped successfully or not.\nWhen any error occurs in this period, the callback(err) will be invoked first (if callback is provided),\nand then the promise will be rejected with an error.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>callback</span> : Function (optional)<div class='sub-desc'><p>The callback will be invoked when stop function is done.</p>\n<p>Defaults to: <code>undefined</code></p><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>err</span> : Error (optional)<div class='sub-desc'><p>The error exists when failed to stop module.</p>\n</div></li></ul></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Promise.&lt;true|Error&gt;</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});