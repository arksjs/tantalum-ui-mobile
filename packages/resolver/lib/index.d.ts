export interface ArkUIResolverOptions {
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
 * Resolver for ArkUI
 *
 * @link https://github.com/arksjs/arkui-mobile-vue
 */
export declare function ArkUIResolver(options?: ArkUIResolverOptions): {
    type: string;
    resolve: (name: string) => {
        importName: string;
        path: string;
        sideEffects: string | undefined;
    } | undefined;
};
