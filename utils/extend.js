module.exports = {
    type:function(value){
        return Object.prototype.toString.call(value).slice(8).slice(0, -1).toLowerCase();
    },
    isArray:function(value){
        return this.type(value) == 'array';
    },
    isObject:function(value){
        return this.type(value) == 'object';
    },
    isFunction:function(value){
        return this.type(value) == 'function';
    },
    extend:function(){
        var src, 
            copyIsArray, 
            copy, 
            name,
            options, 
            clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        if ( typeof target === "boolean" ) {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }
        if ( typeof target !== "object" && !this.isFunction(target) ) {
            target = {};
        }

        if ( length === i ) {
            target = this;
            --i;
        }
        for ( ; i < length; i++ ) {
            if ( (options = arguments[ i ]) != null ) {
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];
                    if ( target === copy ) {
                        continue;
                    }
                    if ( deep && copy && ( this.isObject(copy) || (copyIsArray = this.isArray(copy)) ) ) {
                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && this.isArray(src) ? src : [];

                        } else {
                            clone = src && this.isObject(src) ? src : {};
                        }
                        target[ name ] = this.extend( deep, clone, copy );

                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }
        return target;
    }
}