with open("src/pages/auth/index.tsx", "r") as f:
    c = f.read()

c = c.replace("</TabsCont              <TabsContent", "</TabsContent>\n              <TabsContent")
c = c.replace("</Tabs>\n\n            <SocialLoginButtons showNotice={showNotice} />\n\n            <footer className=\"pt-8 border-t border-[#c4c7c7] flex justify-between items-center\">ter\">", "</Tabs>\n\n            <SocialLoginButtons showNotice={showNotice} />\n\n            <footer className=\"pt-8 border-t border-[#c4c7c7] flex justify-between items-center\">")

with open("src/pages/auth/index.tsx", "w") as f:
    f.write(c)

