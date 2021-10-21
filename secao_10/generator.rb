def eternal_sequence
  Enumerator.new do |enum|
    i = 0
    loop do
      enum.yield i
      i += 1
    end
  end
end

def fib
  Enumerator.new do |enum|
    n1 = 0
    n2 = 1
    loop do
      n1, n2 = [n2, n1 + n2]
      enum.yield n1
    end
  end
end
