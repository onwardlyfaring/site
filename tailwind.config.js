const isProduction = process.env.NODE_ENV === "production";

let purge = false;

// We want optimization only in production
if (isProduction) {
    purge = ["./content/**/*.njk", "./src/*.js"];
}

module.exports = {
    purge,
    content: [
        'content/**/*.{html,js}',
        '_site/**/*.{html,js}'
    ],
      
    darkMode: "class",
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
    variants: {
        extend: {
            backgroundImage: ["dark"],
            fill: ["dark"],
            fontWeight: ["dark"],
            gradientColorStops: ["dark"],
            stroke: ["dark"]
        }
    },
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
                ...theme("colors"),
                "dark-nav": "#242424",
                "dark-body": "#1B1B1E",
                "dark-heading": "#27282B"
            }),
            backgroundImage: () => ({
                "sidebar-dark":
                    "radial-gradient(circle, #242424 0%, #1d1f27 100%)",
                "sidebar-light":
                    "radial-gradient(circle, #e1ecff 0%, #d4e5fe 100%)"
            }),
            borderWidth: (theme) => ({
                ...theme("width"),
                1: "1px"
            }),
            gradientColorStops: (theme) => ({
                ...theme("colors"),
                "dark-outer": "#1B1B1E",
                "dark-middle": "#242424"
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
