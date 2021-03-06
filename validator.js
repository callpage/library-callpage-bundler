class Validator {
    constructor(webpackConfig) {
        this.webpackConfig = webpackConfig;
    }
    validate () {
        this.isBasicsConfigProperties()
        this.isJsConfigInConfig()
        this.validateWebpackConfigType()
        this.validateBasePath()
        this.validateBuildPath()
        this.validateVendorPath()
        this.validateEntryJs()
        this.validateEntryScss()
        this.validateOutputFileName()
    }
    isJsConfigInConfig() {
        this.webpackConfig.forEach(function (config, index) {
            if(!("js" in config)) {
                throw new Error(`\x1b[41m property "js" in object ${index} is required \x1b[0m`)
            }  
            if(config["js"].toString() !== "[object Object]") {
                throw new Error(`\x1b[41m property "js" in object ${index} must be an object \x1b[0m `)
            }  
        })
    }
    isBasicsConfigProperties() {
        this.webpackConfig.forEach(function (config, index) {
            if(!("vendorPath" in config)) {
                throw new Error(`\x1b[41m property "vendorPath" in ${index} object is required \x1b[0m`)                
            } else if (!("buildPath" in config)) {
                throw new Error(`\x1b[41m property "buildPath" in ${index} object is required \x1b[0m`)
            }
        })
    }
    validateWebpackConfigType() {
        if(!Array.isArray(this.webpackConfig)) {
            throw new Error(`\x1b[41m config should be array \x1b[0m`)
        }
    }
    validateOutputFileName () {
        this.webpackConfig.forEach(function (config, index) {
            if(config.js.output.startsWith('/') || config.js.output.startsWith('./')) {
                throw new Error(`\x1b[41m output path in object ${index} shouldn't start with \'/\' \x1b[0m`)
            }
        })
    }
    validateBasePath () {
        this.webpackConfig.forEach(function (config, index) {
            if(config.basePath) {
                if(!(config.basePath.startsWith('/'))) {
                    throw new Error(`\x1b[41m base path in object ${index} should start with \'/\' \x1b[0m`)
                }
            }
        })
    }
    validateBuildPath () {
        this.webpackConfig.forEach(function (config, index) {
            if(config.buildPath) {
                if(!(config.buildPath.startsWith('/'))) {
                    throw new Error(`\x1b[41m build path in object ${index} should start with \'/\' \x1b[0m`)
                }
            }
        })
    }
    validateVendorPath () {
        this.webpackConfig.forEach(function (config, index) {
            if(config.vendorPath.length > 0) {
                if(config.vendorPath.startsWith('/') || config.vendorPath.endsWith('/')) {
                    throw new Error(`\x1b[41m vendor path in object ${index} shouldn't start or end with' \'/\' \x1b[0m`)
                }
            } else {
                throw new Error(`\x1b[41m vendor path in object ${index} cannot be empty \x1b[0m`)
            }
        })
    }
    validateEntryJs() {
        this.webpackConfig.forEach(function (config, index) {    
            if(config.js) {
                if(config.js.entry.startsWith('./')) {
                    throw new Error(`\x1b[41m js entry in object ${index} shouldn't contain './' \x1b[0m`)
                } 
                if(config.js.entry.startsWith('/')) {
                     throw new Error(`\x1b[41m js entry in object ${index} shouldn't contain '/' \x1b[0m`)
                }
            }
        })
    }
    validateEntryScss() {
        this.webpackConfig.forEach(function (config, index) {
            if(config.scss) {
                if(config.scss.entry.startsWith('./') || config.scss.entry.startsWith('/')) {
                    throw new Error(`\x1b[41m scss entry in object ${index} shouldn't contain './' or '/' \x1b[0m`)
                }
            } 
        })
    }
}

module.exports = function(webpackConfig) {
    const validator = new Validator(webpackConfig);
    validator.validate();
};
