import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CalendarDays, Clock, User, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt:
      "Explore the latest trends shaping the future of web development, from AI integration to new frameworks and tools that are revolutionizing how we build applications.",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1496065187959-7f07b8353c55",
    tags: ["Web Development", "AI", "Trends"],
  },
  {
    id: 2,
    title: "Building Scalable Applications with Modern Architecture",
    excerpt:
      "Learn how to design and build applications that can scale with your business needs using microservices, cloud computing, and modern development practices.",
    author: "Mike Chen",
    date: "2024-01-12",
    readTime: "8 min read",
    category: "Development",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    tags: ["Architecture", "Scalability", "Cloud"],
  },
  {
    id: 3,
    title: "The Art of User Experience Design",
    excerpt:
      "Discover the principles and practices that make great user experiences, from user research to prototyping and testing.",
    author: "Emily Davis",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    tags: ["UX", "Design", "User Research"],
  },
  {
    id: 4,
    title: "Getting Started with TypeScript",
    excerpt:
      "A comprehensive guide to TypeScript for JavaScript developers, covering types, interfaces, and best practices.",
    author: "Alex Rodriguez",
    date: "2024-01-08",
    readTime: "4 min read",
    category: "Programming",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    tags: ["TypeScript", "JavaScript", "Programming"],
  },
  {
    id: 5,
    title: "CSS Grid vs Flexbox: When to Use What",
    excerpt: "Understanding the differences and use cases for CSS Grid and Flexbox to create better layouts.",
    author: "Lisa Wang",
    date: "2024-01-05",
    readTime: "7 min read",
    category: "CSS",
    image: "https://images.unsplash.com/photo-1562408590-e32931084e23",
    tags: ["CSS", "Layout", "Frontend"],
  },
  {
    id: 6,
    title: "Database Optimization Techniques",
    excerpt: "Improve your database performance with these proven optimization strategies and best practices.",
    author: "David Kim",
    date: "2024-01-03",
    readTime: "10 min read",
    category: "Database",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    tags: ["Database", "Performance", "Optimization"],
  },
]

const categories = ["All", "Technology", "Development", "Design", "Programming", "CSS", "Database"]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
     

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Our Blog
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover insights, tutorials, and stories from our community of developers and designers.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 mb-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search articles..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Latest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-4 pb-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600">
                    {post.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <User className="w-4 h-4 mr-2" />
                    <span className="mr-4">{post.author}</span>
                    <CalendarDays className="w-4 h-4 mr-2" />
                    <span className="mr-4">{post.date}</span>
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{post.readTime}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Link href={`/blog/${post.id}`}>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all"
                    >
                      Read More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700  "
            >
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss our latest articles and insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
