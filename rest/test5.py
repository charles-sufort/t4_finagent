from pydantic import BaseModel

class FooBar(BaseModel):
    a: str
    b: dict

foo = FooBar(a="hello",b={'apple':[1,2,3,4]})
print(foo.b)

