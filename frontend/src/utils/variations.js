export function* permutationsWithReplacement(
    iterable,
    r,
) {
    if (!Number.isInteger(r) || r < 0) {
        throw RangeError("r must be a non-negative integer");
    }
    const pool = [...iterable];
    const n = pool.length;
    if (r === 0) {
        yield [];
        return;
    }
    if (n === 0 && r > 0) {
        return;
    }
    const indices = new Uint32Array(r);
    yield Array(r).fill(pool[0]);
    while (true) {
        let i;
        loop: {
            for (i = r - 1; i >= 0; i--) {
                if (indices[i] === n - 1) {
                    continue;
                }
                const result = Array(r);
                for (let j = 0; j < i; j++) {
                    result[j] = pool[indices[j]];
                }
                const index = indices[i] += 1;
                result[i] = pool[index];
                for (let j = i + 1; j < r; j++) {
                    indices[j] = 0;
                    result[j] = pool[0];
                }
                yield result;
                break loop;
            }
            return;
        }
    }
}