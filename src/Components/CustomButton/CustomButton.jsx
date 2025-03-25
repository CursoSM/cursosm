import { motion } from "framer-motion"


const CustomButton = ({children, onClick, animationType = "rotate", className, disable = false}) => {


    return (
        <motion.button
        disabled={disable}
        className={`${className} ${disable ? "disable-btn" : ""}`}
            initial={{
                rotate: "0deg",
                scale: 1
            }}
            whileHover={{
                rotate: animationType == "rotate" ? "3deg" : "0deg",
                scale: animationType == "rotate" ? 1.05 : 1,
                scaleY: animationType == "verticalScale" ? 1.2 : 1
            }}
            whileTap={{
                scale: 1.1
            }}
            transition={{
                duration: .6,
                type: "spring"
            }}
            onClick={onClick}
        >
            {children}
        </motion.button>
    )
}


export default CustomButton