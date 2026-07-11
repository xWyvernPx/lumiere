with open("src/pages/auth/SocialLoginButtons.tsx", "r") as f:
    c = f.read()

# Replace the Facebook button styling
c = c.replace("""className="flex items-center justify-center space-x-2 border-4 border-black bg-white hover:bg-[#eeeeee] transition-colors cursor-pointer w-full" style={{ height: 40 }}""", """className="flex items-center justify-center space-x-2 border border-[#dadce0] rounded-[4px] bg-white hover:bg-[#f8f9fa] transition-colors cursor-pointer w-full text-[#3c4043]" style={{ height: 40, boxShadow: 'none' }}""")

# Replace the Apple button styling
c = c.replace("""className="flex items-center justify-center space-x-2 border-4 border-black bg-white hover:bg-[#eeeeee] transition-colors cursor-pointer w-full" style={{ height: 40 }}""", """className="flex items-center justify-center space-x-2 border border-[#dadce0] rounded-[4px] bg-white hover:bg-[#f8f9fa] transition-colors cursor-pointer w-full text-[#3c4043]" style={{ height: 40, boxShadow: 'none' }}""")

# Remove uppercase and tracking-widest from span for Facebook
c = c.replace("""<span className="font-sans font-bold text-[11px] uppercase tracking-widest text-[#1a1c1c]">Facebook</span>""", """<span className="font-sans font-medium text-[14px]">Continue with Facebook</span>""")

# Remove uppercase and tracking-widest from span for Apple
c = c.replace("""<span className="font-sans font-bold text-[11px] uppercase tracking-widest text-[#1a1c1c]">Apple</span>""", """<span className="font-sans font-medium text-[14px]">Continue with Apple</span>""")

# Wrap GoogleLogin in a w-full div
c = c.replace("""        <div className="flex items-center justify-center h-full">
          <GoogleLogin""", """        <div className="flex items-center justify-center h-full w-full [&>div]:w-full">
          <GoogleLogin""")

with open("src/pages/auth/SocialLoginButtons.tsx", "w") as f:
    f.write(c)

