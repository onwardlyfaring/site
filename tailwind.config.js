const isProduction = process.env.NODE_ENV === "production";

let purge = false;

// We want optimization only in production
if (isProduction) {
    purge = ["./content/**/*.njk", "./src/*.js"];
}

module.exports = {
    purge,
    content: { relative: true, files: [
        "./_11ty/**/*.{html,js,njk,md}",
        './assets/**/*.{html,js,njk,md}',
        './content/**/*.{html,js,njk,md}',
        "./scripts/**/*.{html,js,njk,md}", 
        "./src/**/*.{html,js,njk,md}",
      ]
    },
      
    // plugins: [
    //     function ({ addUtilities }) {
    //         const extendUnderline = {
    //             ".underline": {
    //                 textDecoration: "underline",
    //                 // "text-decoration-color": "text-indigo-300",
    //                 "text-underline-position": "under"
    //             }
    //         };
    //         addUtilities(extendUnderline);
    //     }
    // ],
    theme: {
        extend: {
            colors: {
                "onwardFontColor": "#000815",
                "onwardBackground": "#c9deff",
                "onwardExternalLinkColor": "#cc4f7f", 
                "onwardVeryLightBlue": "#e1ecff",
                "onwardVeryDarkBlue": "#56647b",
                "onwardLightYellowish": "#fcffe4"

                , blackberry : {
                    lightest: "#fdf8f8",
                    light: "#bb0000", 
                    DEFAULT: "#800000" 
                }
                , onwardPurplish : {
                    DEFAULT: "#d6d7f5",
                    // darker: "#adafeb",
                    // darkerr: "#7073dc",
                    // darkerrr: "#3337cd",
                    // darkerrrr: "#16195b",
                    darker: "#56369f"
                }

                , onwardYellowish: {
                    lighterr: "#FEFFF6",
                    lighter: "#fcffe4",
                    DEFAULT: "#f9ffc9"
                }

                , onwardLightBlue: {
                    lighter: "#f5f8ff",
                    DEFAULT: "#d4e5fe"
                }

            }
            ,
            fontFamily : {
                'spacious': ['Consolas', '"Andale Mono"', '"Trebuchet MS"', '"Lucida Console"', 'Times',  'sans-serif'],
                'mySans': ['"Trebuchet MS"', '"Lucida Grande"', '"Lucida Sans Unicode"', '"Lucida Sans"', 'Tahoma', 'sans-serif']
            }

            , backgroundColor: (theme) => ({
                ...theme("colors")
            }),
            backgroundImage: () => ({
                "sidebar-light":
                    "radial-gradient(circle, #e1ecff 0%, #d4e5fe 100%)"
            }),
            borderWidth: (theme) => ({
                ...theme("width"),
                1: "1px"
            }),
            gradientColorStops: (theme) => ({
                ...theme("colors")
            }),
            gridTemplateColumns: {
                small: "0 auto",
                regular: "minmax(auto, 0fr) auto;",
                topbar: "auto 18rem",
                simple: "auto"
            },
            lineHeight: {
                pagination: "1.8rem",
                12: "3rem"
            },
            margin: {
                15: "3.75rem"
            },
            maxWidth: {
                content: "95rem"
            },
            textColor: {
                "orange-hover": "#d2603a"
            }
        }
    }
};
