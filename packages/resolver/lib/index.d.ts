export interface UIResolverOptions {
    /**
     * import style css or sass along with components
     *
     * @default true
     */
    importStyle?: boolean | 'css' | 'sass';
    /**
     * use commonjs lib or es module
     *
     * @default "esm"
     */
    format?: 'esm' | 'cjs';
}
/**
 * Resolver for Tantalum UI
 *
 * @link https://github.com/arksjs/tantalum-ui-mobile
 */
export declare function UIResolver(options?: UIResolverOptions): {
    type: string;
    resolve: (name: string) => {
        importName: string;
        path: string;
        sideEffects: string | undefined;
    } | undefined;
};
