interface CategorySelectProps {
  onChange: (category: string) => void;
  value: string
}

export default function CategorySelect({ onChange, value }: CategorySelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="my-2">
      <label
        htmlFor="category"
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        카테고리
      </label>
      <select
        id="category"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-400 focus:ring-green-400"
        onChange={handleChange} value={value}
      >
        <option value="사회과학">사회과학</option>
        <option value="기술과학">기술과학</option>
        <option value="문학">문학</option>
        <option value="철학">철학</option>
        <option value="예술">예술</option>
        <option value="언어">언어</option>
        <option value="역사">역사</option>
        <option value="종교">종교</option>
        <option value="자연과학">자연과학</option>
        <option value="기타">기타</option>
      </select>
    </div>
  );
}

